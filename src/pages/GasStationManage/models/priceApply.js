import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';
import moment from 'moment';

const namespace = 'priceApply';
const selectState = state => state[namespace];

const defaultListParams = {
  oilModelName: null, // 油品名称
  currentPage: 1,
};

const defaultFormData = {
  oilModelName: null,
  oilRetailPrice: null,
  oilMemberAgio: null,
  oilMemberPrice: null,
  effectTime: null,
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
        case dict.SUCCESS:
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
      data.effectTime = moment(data.effectTime).format('YYYY-MM-DD');
      const response = yield call(services.priceApplyUpdate, { id, ...data });
      switch (response.code) {
        case dict.SUCCESS:
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
