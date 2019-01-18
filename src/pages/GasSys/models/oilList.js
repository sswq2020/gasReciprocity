import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';

const namespace = 'oilList';
const selectState = state => state[namespace];

const defaultListParams = {
  text: '',
  page: 1,
};

const defaultFormData = {
  username: '',
  password: '',
  type: 'GENERAL',
};

export default {
  namespace,
  state: {
    isEdit: false,
    visible: false,
    id: null,
    formData: {
      ...defaultFormData,
    },
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
      const response = yield call(services.oilList, listParams);
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
          message.warning('特色服务列表获取失败，请稍后重试！');
          break;
      }
    },
    *create({ payload }, { call, put }) {
      const { data, resetFields } = payload;
      const response = yield call(services.oilCreate, data);
      switch (response.code) {
        case '000000':
          resetFields();
          message.success('油品分类创建成功！');
          yield put({ type: 'resetListParams' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('油品分类创建失败，请稍后重试！');
          break;
      }
    },
    *edit({ payload }, { call, put, select }) {
      const { id } = yield select(selectState);
      const { data, resetFields } = payload;
      const response = yield call(services.oilEdit, id, data);

      switch (response.code) {
        case '000000':
          resetFields();
          message.success('油品分类编辑成功！');
          yield put({ type: 'getList' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('油品分类编辑失败，请稍后重试！');
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
