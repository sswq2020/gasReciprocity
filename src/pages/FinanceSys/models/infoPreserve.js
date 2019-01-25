import { message } from 'antd';
import { reducers, ERR_OK } from '@/utils/utils';
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
    *getDetail({ payload }, { call, put }) {
      const response = yield call(services.billInfo, payload);
      switch (response.code) {
        case ERR_OK:
          yield put({
            type: 'overrideStateProps',
            payload: {
              detail: response.data,
            },
          });
          break;
        default:
          message.warning('开票信息获取失败，请稍后重试！');
          break;
      }
    },
  },
};
