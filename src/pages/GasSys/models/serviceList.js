import { message } from 'antd';
import { reducers } from '@/utils/utils';
import services from '@/services';
import dict from '@/utils/dict';

const namespace = 'serviceList';
const selectState = state => state[namespace];

const defaultListParams = {
  fsName: '',
  currentPage: 1,
};

const defaultFormData = {
  fsName: '',
  fsIcon: {
    url: null,
    fileName: null,
    groupId: null,
  },
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
      totalItemCount: 0,
    },
  },

  reducers,

  effects: {
    *getList(_, { call, put, select }) {
      const { listParams } = yield select(selectState);
      const response = yield call(services.serviceList, listParams);
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
                list: {
                  ...response.data,
                  list: response.data.list.map(r => {
                    return {
                      ...r,
                      fsIcon: JSON.parse(r.fsIcon),
                    };
                  }),
                },
              },
            });
          }
          break;
        default:
          message.warning(`${response.mesg}，请稍后重试！`);
          break;
      }
    },
    *create({ payload }, { call, put }) {
      const { data } = payload;
      const response = yield call(services.serviceCreate, data);
      switch (response.code) {
        case dict.SUCCESS:
          message.success('特色服务创建成功！');
          yield put({ type: 'resetListParams' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning(`${response.mesg}，请稍后重试！`);
          break;
      }
    },
    *edit({ payload }, { call, put, select }) {
      const { id } = yield select(selectState);
      const { data } = payload;
      const response = yield call(services.serviceEdit, id, data);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('特色服务编辑成功！');
          yield put({ type: 'getList' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('特色服务编辑失败，请稍后重试！');
          break;
      }
    },
    *enable({ payload }, { call }) {
      const { id } = payload;
      const response = yield call(services.serviceEnable, id);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('特色服务激活成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning('特色服务激活失败，请稍后重试！');
          break;
      }
    },
    *disable({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.serviceDisable, id);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('特色服务禁用成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning('特色服务禁用失败，请稍后重试！');
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
    *deleted({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.serviceDelete, id);
      switch (response.code) {
        case dict.SUCCESS:
          message.success('特色服务删除成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning(`${response.mesg}，请稍后重试！`);
          break;
      }
    },
  },
};
