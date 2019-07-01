import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';
import dict from '@/utils/dict';

const namespace = 'oilList';
const selectState = state => state[namespace];

const defaultListParams = {
  oilModelName: '',
  currentPage: 1,
};

const defaultFormData = {
  oilModelName: '',
  oilModelDesc: '',
  oilUnit:'',
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
      list: [],
      itemCount: 0,
    },
  },

  reducers,

  effects: {
    *getList(_, { call, put, select }) {
      const { listParams } = yield select(selectState);
      const response = yield call(services.oilList, listParams);
      switch (response.code) {
        case dict.SUCCESS:
          if (response.data.pageTotal < response.data.currentPage) {
            yield put({
              type: 'changeListParams',
              payload: {
                currentPage: response.data.pageTotal,
              },
            });
            yield put({
              type: 'getList',
            });
          } else {
            yield put({
              type: 'overrideStateProps',
              payload: {
                list: response.data,
              },
            });
          }

          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },
    *create({ payload }, { call, put }) {
      const { data } = payload;
      const response = yield call(services.oilCreate, data);
      switch (response.code) {
        case dict.SUCCESS:
          message.success('油气分类创建成功！');
          yield put({ type: 'resetListParams' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },
    *deleted({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.oilDeleted, id);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('油气分类删除成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },
    *edit({ payload }, { call, put, select }) {
      const { id } = yield select(selectState);
      const { data } = payload;
      const response = yield call(services.oilEdit, id, data);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('油气分类编辑成功！');
          yield put({ type: 'getList' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },
    *enable({ payload }, { call }) {
      const { id } = payload;
      const response = yield call(services.oilEnable, id);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('油气分类启用成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },
    *disable({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.oilDisable, id);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('油气分类禁用成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },
    *setDefault({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.oilSetDefault, id);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('油气分类设为默认展示成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning(response.mesg);
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
