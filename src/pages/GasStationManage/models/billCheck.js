import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import moment from 'moment';
import services from '@/services';

const namespace = 'billCheck';
const selectState = state => state[namespace];

const defaultListParams = {
  year: moment(new Date(), 'YYYY').valueOf(), // 统一时间戳
};

export default {
  namespace,
  state: {
    listParams: {
      ...defaultListParams,
    },
    data: [],
  },
  reducers,
  effects: {
    *getList(_, { call, put, select }) {
      const { listParams } = yield select(selectState);
      const response = yield call(services.billCheckList, listParams);
      switch (response.code) {
        case dict.SUCCESS:
          yield put({
            type: 'overrideStateProps',
            payload: {
              data: response.data.data,
            },
          });
          break;
        default:
          message.warning('票据对账列表获取失败，请稍后重试！');
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
