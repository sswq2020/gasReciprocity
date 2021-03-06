import { message } from 'antd';
// import { routerRedux } from 'dva/router';
import { gasModelToFormData } from '@/utils/adapter';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';

const namespace = 'gasList';
const selectState = state => state[namespace];

const defaultListParams = {
  memberName: '',
  gsName: '',
  isBan: null,
  currentPage: 1,
};

export default {
  namespace,
  state: {
    // qCodePopup: false,
    // qCodeUrl: '',
    toEdit: false,
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
      const response = yield call(services.gasList, listParams);
      switch (response.code) {
        case dict.SUCCESS:
          yield put({
            type: 'overrideStateProps',
            payload: {
              list: response.data,
            },
          });
          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },
    *enable({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.gasEnable, id);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('加油站启用成功！');
          yield put({ type: 'getList' });
          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },
    *disable({ payload }, { call, put }) {
      const { id } = payload;
      const response = yield call(services.gasDisable, id);

      switch (response.code) {
        case dict.SUCCESS:
          message.success('加油站禁用成功！');
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
    *initList(_, { put, select }) {
      const { toEdit } = yield select(selectState);
      yield put({
        type: 'overrideStateProps',
        payload: {
          toEdit: false,
        },
      });
      if (toEdit === true) {
        yield put({
          type: 'getList',
        });
      } else {
        yield put({
          type: 'resetListParams',
        });
      }
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
    *toEdit({ payload }, { put }) {
      const {
        data: { id, ...formData },
      } = payload;
      yield put({
        type: 'gasEdit/overrideStateProps',
        payload: {
          id,
          formData: gasModelToFormData(formData),
        },
      });
      // yield put(
      //   routerRedux.push({
      //     pathname: '/gasSys/gas/edit',
      //   })
      // );
    },
  },
};
