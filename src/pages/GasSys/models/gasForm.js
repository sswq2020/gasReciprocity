import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'gasForm';
const selectState = state => state[namespace];

const defaultFormData = {
  oilModelId: null,
  oilModelName: null,
  oilRetailPrice: null,
  oilRetailWarn: null,
  oilMemberAgio: null,
  oilMemberPrice: null,
};

export default {
  namespace,
  state: {
    formData: {
      ...defaultFormData,
    },
    visible: false,
    isEdit: false,
    provinceList: [],
    featureServiceInfoList: [],
    oilModelInfoList: [],
  },

  reducers,

  effects: {
    *getDict(_, { put, call }) {
      const response = yield call(services.gasDict);
      switch (response.code) {
        case '000000':
          yield put({
            type: 'updateStateProps',
            payload: {
              ...response.data,
            },
          });
          break;
        default:
          message.warning('相关资源获取失败，请稍后重试！');
          break;
      }
    },
    *add({ payload }, { put, select }) {
      const { oilList } = yield select(selectState);
      const { resetFields } = payload;
      resetFields();
      oilList.push({
        id: oilList.length,
        b: 'b',
        c: 'b',
        d: 'b',
        e: 'b',
        f: 'b',
      });
      yield put({
        type: 'overrideStateProps',
        payload: {
          oilList,
        },
      });
      yield put({
        type: 'closeForm',
      });
    },
    *delete({ payload }, { put, select }) {
      const { oilList } = yield select(selectState);
      oilList.splice(payload, 1);
      yield put({
        type: 'overrideStateProps',
        payload: {
          oilList,
        },
      });
      yield put({
        type: 'closeForm',
      });
    },
    *openForm({ payload }, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          visible: true,
          ...payload,
        },
      });
    },
    *closeForm(_, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          visible: false,
          formData: {
            ...defaultFormData,
          },
        },
      });
    },
  },
};
