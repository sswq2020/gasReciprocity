import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';

const namespace = 'infoPreserve';
const defaultParams = {
  name: null,
  taxPayerIdNum: null,
  adress: null,
  tel: null,
  bank: null,
  account: null,
  ticketer: null,
  ticketerTel: null,
  adress2: null,
};

export default {
  namespace,
  state: {
    id: null,
    formData: { ...defaultParams },
  },
  reducers,
  effects: {
    *save({ payload }, { call, put }) {
      const { formData } = payload;
      const response = yield call(services.gasCreate, formData);
      switch (response.code) {
        case dict.SUCCESS:
          message.success('开票、收票地址信息创建成功！');
          yield put(
            routerRedux.push({
              pathname: '/financeSys',
            })
          );
          break;
        default:
          message.warning('开票、收票地址信息创建失败，请稍后重试！');
          break;
      }
    },
  },
};
