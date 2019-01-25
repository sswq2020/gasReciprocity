import { message } from 'antd';
import { reducers, ERR_OK } from '@/utils/utils';
import services from '@/services';

const namespace = 'priceApply';
const selectState = state => state[namespace];

const defaultListParams = {
  fuelName: null, // 油品名称
  currentPage: 1,
};

const defaultFormData = {
  fuelName: null,
  retailPrice: null,
  memberDiscount: null,
  memberPrice: null,
  effectDate: null,
};

export default {
  namespace,
  state: {
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
      const response = yield call(services.priceApplyList, listParams);
      switch (response.code) {
        case ERR_OK:
          yield put({
            type: 'overrideStateProps',
            payload: {
              list: response.data,
            },
          });
          break;
        default:
          message.warning('调价申请列表获取失败，请稍后重试！');
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
    *applyPrice({ payload }, { call, put, select }) {
      const { id } = yield select(selectState);
      const { data } = payload;
      const response = yield call(services.priceApplyList, { id, data });
      switch (response.code) {
        case ERR_OK:
          message.success('调价申请成功！');
          yield put({ type: 'getList' });
          yield put({ type: 'closeForm' });
          break;
        default:
          message.warning('调价申请失败，请稍后重试！');
          break;
      }
    },
  },
};
