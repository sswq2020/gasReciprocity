import { message } from 'antd';
import { reducers } from '@/utils/utils';
import moment from 'moment';
import services from '@/services';

const namespace = 'getDetailes';
const selectState = state => state[namespace];

const defaultListParams = {
  refuelTime: moment(new Date(), 'YYYY/MM/DD').valueOf(), // 统一时间戳
  gasStation: '', // 加油站名称
  page: 1,
};

export default {
  namespace,
  state: {
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
      const response = yield call(services.refuelDetailList, listParams);
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
          message.warning('加油明细列表获取失败，请稍后重试！');
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
