import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import moment from 'moment';
import services from '@/services';

const namespace = 'getDetailes';
const selectState = state => state[namespace];

const defaultListParams = {
  queryYears: moment(),
  gsId: '', // 加油站id
  userPlate:"", // 车牌号
  currentPage: 1,
};

export default {
  namespace,
  state: {
    gas: { id: null, gsName: null },
    listParams: {
      ...defaultListParams,
    },
    list: {
      orderDtoList: [],
      itemCount: 0,
      pageTotal: 0,
      oilSubTotal: 0,
      fuelVSubTotal: 0,
      oilTotal: 0,
      fuelVTotal: 0,
      /**新增加气***/
      gasSubtotal:0,
      gasFuelVSubTotal:0,
      gasTotal:0,
      gasFuelVTotal:0
    },
  },
  reducers,
  effects: {
    *getList(_, { call, put, select }) {
      const { listParams } = yield select(selectState);
      const queryParams = Object.assign({}, listParams, {
        queryYears: listParams.queryYears ? moment(listParams.queryYears).format('YYYY-MM') : null,
      });
      const response = yield call(services.hlRefuelDetailList, queryParams);
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
          message.warning('加注明细列表获取失败，请稍后重试！');
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
  },
};
