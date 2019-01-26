import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import { gasModelToFormData, formDataTogasModel } from '@/utils/adapter';

import services from '@/services';

const namespace = 'gasEdit';
const selectState = state => state[namespace];

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
    id: null,
    formData: {
      ...defaultFormData,
    },
  },

  reducers,

  effects: {
    *detail({ payload }, { call, put }) {
      const response = yield call(services.gasDetail, payload);
      switch (response.code) {
        case dict.SUCCESS:
          yield put({
            type: 'overrideStateProps',
            payload: {
              formData: gasModelToFormData(response.data),
            },
          });
          break;
        default:
          message.warning('加油站信息获取失败，请稍后重试！');
          break;
      }
    },
    *submit({ payload }, { call, put, select }) {
      const { id } = yield select(selectState);
      const { data } = payload;
      const response = yield call(services.gasEdit, id, formDataTogasModel(data));
      switch (response.code) {
        case dict.SUCCESS:
          message.success('加油站编辑成功！');
          yield put(
            routerRedux.push({
              pathname: '/gasSys/gas',
            })
          );
          break;
        default:
          message.warning('加油站编辑失败，请稍后重试！');
          break;
      }
    },
  },
};
