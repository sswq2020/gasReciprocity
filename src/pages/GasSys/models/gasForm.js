// import { message } from 'antd';
import { reducers } from '@/utils/utils';
// import services from '@/services';

const namespace = 'gasForm';
const selectState = state => state[namespace];

const defaultFormData = {
  username: '',
  password: '',
  type: 'GENERAL',
};

export default {
  namespace,
  state: {
    oilSelectList: [1, 2, 3, 4],
    oilList: [
      {
        id: '1',
        b: 'b',
        c: 'b',
        d: 'b',
        e: 'b',
        f: 'b',
      },
      {
        id: '2',
        b: 'b',
        c: 'b',
        d: 'b',
        e: 'b',
        f: 'b',
      },
      {
        id: '3',
        b: 'b',
        c: 'b',
        d: 'b',
        e: 'b',
        f: 'b',
      },
    ],
    imgList: [0, 1],
    visible: false,
    isEdit: false,
    formData: {
      ...defaultFormData,
    },
  },

  reducers,

  effects: {
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
