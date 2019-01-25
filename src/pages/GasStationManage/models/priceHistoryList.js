import { message } from 'antd';
import { reducers, ERR_OK } from '@/utils/utils';
import services from '@/services';

const namespace = 'priceHistoryList';
const selectState = state => state[namespace];

const defaultListParams = {
  id: null, // 油品名称
  currentPage: 1,
};

export default {
  namespace,
  state: {
    visible: false,
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
      const response = yield call(services.priceApplyList, listParams);
      switch (response.code) {
        case ERR_OK:
          yield put({
            type: 'overrideStateProps',
            payload: {
              list: response.data,
            },
          });
          break;
        default:
          message.warning('调价申请列表获取失败，请稍后重试！');
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
    *openPopup({ payload }, { put }) {
      const { id } = payload;
      yield put({
        type: 'overrideStateProps',
        payload: {
          listParams: { ...defaultListParams, id },
        },
      });
      yield put({
        type: 'overrideStateProps',
        payload: {
          visible: true,
        },
      });
      yield put({
        type: 'getList',
      });
    },
    *closePopup(_, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          visible: false,
        },
      });
    },
  },
};
