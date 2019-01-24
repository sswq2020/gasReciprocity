import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'gasList';
const selectState = state => state[namespace];

const defaultListParams = {
  memberName: '',
  gsName: '',
  certState: null,
  page: 1,
};

export default {
  namespace,
  state: {
    // qCodePopup: false,
    // qCodeUrl: '',
    toEdit: false,
    listParams: {
      ...defaultListParams,
    },
    list: {
      data: [],
      totalItemCount: 0,
    },
  },

  reducers,

  effects: {
    *getList(_, { call, put, select }) {
      const { listParams } = yield select(selectState);
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
    *initList(_, { put, select }) {
      const { toEdit } = yield select(selectState);
      yield put({
        type: 'overrideStateProps',
        payload: {
          toEdit: false,
        },
      });
      if (toEdit === true) {
        yield put({
          type: 'getList',
        });
      } else {
        yield put({
          type: 'resetListParams',
        });
      }
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
