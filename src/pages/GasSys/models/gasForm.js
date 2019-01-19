// import { message } from 'antd';
import { reducers } from '@/utils/utils';
// import services from '@/services';

const namespace = 'gasForm';
// const selectState = state => state[namespace];

const defaultFormData = {
  username: '',
  password: '',
  type: 'GENERAL',
};

export default {
  namespace,
  state: {
    oilSelectList: [],
    oilList: [],
    imgList: [0, 1],
    visible: false,
    isEdit: false,
    formData: {
      ...defaultFormData,
    },
  },

  reducers,

  effects: {
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
