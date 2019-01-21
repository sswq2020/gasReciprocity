import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';
import dict from '@/utils/dict';

const namespace = 'oilList';
const selectState = state => state[namespace];

const defaultListParams = {
  oilModelName: '',
  page: 1,
};

const defaultFormData = {
  oilModelName: '',
  oilModelDesc: '',
  isDefault: dict.oilModelIsNotDefault,
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
          message.warning(`${response.errMsg}，请稍后重试！`);
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
          message.warning(`${response.errMsg}，请稍后重试！`);
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
    *enable({ payload }, { call }) {
      const { id } = payload;
      const response = yield call(services.oilEnable, id);

      switch (response.code) {
        case '000000':
          message.success('油品分类激活成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning('油品分类激活失败，请稍后重试！');
          break;
      }
    },
    *disable({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.oilDisable, id);

      switch (response.code) {
        case '000000':
          message.success('油品分类禁用成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning('油品分类禁用失败，请稍后重试！');
          break;
      }
    },
    *setDefault({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.oilSetDefault, id);

      switch (response.code) {
        case '000000':
          message.success('油品分类设为默认展示成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning('油品分类设为默认展示失败，请稍后重试！');
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
