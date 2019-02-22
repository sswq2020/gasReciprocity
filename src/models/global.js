import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'global';
const selectState = state => state[namespace];

export default {
  namespace,
  reducers,

  state: {
    collapsed: false,
    notices: [],
    dictMap: {},
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

    *getDictData({ payload }, { put, call, select }) {
      const { dictMap } = yield select(selectState);
      console.log(dictMap[payload]);
      if (Array.isArray(dictMap[payload]) === false || dictMap[payload].length === 0) {
        const response = yield call(services.getDictData, payload);
        if (response.success === true && response.body.length > 0) {
          const dictTemp = response.body.filter(item => item.entryCode === payload);
          yield put({
            type: 'updateStateProps',
            payload: {
              name: 'dictMap',
              value: {
                [payload]: dictTemp.length > 0 ? dictTemp[0].items : null,
              },
            },
          });
        } else {
          message.warning('数据获取失败，请稍后重试！');
        }
      }
    },
  },
};
