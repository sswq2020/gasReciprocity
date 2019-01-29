import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';

const namespace = 'invoiceConfirm';
const selectState = state => state[namespace];

const defaultListParams = {
  createTime: '', // 年月
  gsName: '', // 加油站名称
  currentPage: 1,
};

export default {
  namespace,
  state: {
    listParams: {
      ...defaultListParams,
    },
    list: {
      list: [],
      itemCount: 0,
    },
  },

  reducers,

  effects: {
    *getList(_, { call, put, select }) {
      const { listParams } = yield select(selectState);
      const response = yield call(services.invoiceConfirmList, listParams);
      switch (response.code) {
        case dict.SUCCESS:
          yield put({
            type: 'overrideStateProps',
            payload: {
              list: response.data,
            },
          });
          break;
        default:
          message.warning('收票确认列表获取失败，请稍后重试！');
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
    *disannul({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.invoiceDisannul, id);
      switch (response.code) {
        case dict.SUCCESS:
          message.success('作废成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning('作废失败，请稍后重试！');
          break;
      }
    },
  },
};
