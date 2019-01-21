import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'createInvoice';
// const selectState = store => store[namespace];

const defaultFormData = {
  year: null,
  gasStation: null,
  invoiceType: null,
  invoiceNumList: null,
  invoicePartyName: null,
  taxRate: null,
  sum: null,
  photo: {
    url: null,
  },
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
    *getList(_, { call, put }) {
      const response = yield call(services.gasList, listParams);
      switch (response.code) {
        case '000000':
          yield put({
            type: 'overrideStateProps',
            payload: {
              list: response.data,
            },
          });
          break;
        default:
          message.warning('加油站列表获取失败，请稍后重试！');
          break;
      }
    },
    *changeListParams({ payload }, { put }) {
      yield put({
        type: 'updateStateProps',
        payload: {
          name: 'listParams',
          value: {
            ...payload,
          },
        },
      });
      yield put({
        type: 'getList',
      });
    },
    *resetListParams(_, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          listParams: {
            ...defaultListParams,
          },
        },
      });
      yield put({
        type: 'getList',
      });
    },
  },
};
