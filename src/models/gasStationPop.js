import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';

const namespace = 'gasStationPop';
const selectState = state => state[namespace];

const defaultListParams = {
  gsName: null, // 加油站名称
  currentPage: 1,
  pageSize: 5,
};

export default {
  namespace,
  state: {
    visible: false,
    listParams: {
      ...defaultListParams,
    },
    gas: null,
    list: {
      list: [],
      itemCount: 0,
    },
  },
  reducers,
  effects: {
    *getList(_, { call, put, select }) {
      const { listParams } = yield select(selectState);
      const response = yield call(services.gasList, listParams);
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
    *openPopup(_, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          visible: true,
          gas: null,
        },
      });
      yield put({
        type: 'resetListParams',
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
