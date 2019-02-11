import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'global';
// const selectState = state => state[namespace];

export default {
  namespace,
  reducers,

  state: {
    collapsed: false,
    notices: [],
    selectList: {},
  },

  effects: {
    *changeLayoutCollapsed({ payload }, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          collapsed: payload,
        },
      });
    },

    *getSelectData({ payload }, { put, call }) {
      const response = yield call(services.getSelectData, payload);
      if (response.success === true && response.body.length > 0) {
        const dictTemp = response.body.filter(item => item.entryCode === payload);
        yield put({
          type: 'updateStateProps',
          payload: {
            name: 'selectList',
            value: {
              [payload]: dictTemp.length > 0 ? dictTemp[0].items : null,
            },
          },
        });
      } else {
        message.warning('数据获取失败，请稍后重试！');
      }
    },
  },
};
