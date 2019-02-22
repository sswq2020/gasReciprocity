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
    dictList: {},
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
      const { dictList } = yield select(selectState);
      if (Array.isArray(dictList[payload]) === false || dictList[payload].length === 0) {
        const response = yield call(services.getDictData, payload);
        if (response.success === true && response.body.length > 0) {
          let list = response.body.filter(item => item.entryCode === payload);
          list = list.length > 0 ? list[0].items : [];

          const map = {
            codeToName: {},
            nameToCode: {},
          };

          list.forEach(row => {
            map.codeToName[row.itemCode] = row.itemName;
          });

          list.forEach(row => {
            map.nameToCode[row.itemName] = row.itemCode;
          });

          yield put({
            type: 'updateStateProps',
            payload: {
              name: 'dictList',
              value: {
                [payload]: list,
              },
            },
          });
          yield put({
            type: 'updateStateProps',
            payload: {
              name: 'dictMap',
              value: {
                [payload]: map,
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
