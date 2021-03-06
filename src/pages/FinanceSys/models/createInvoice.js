import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';
import { routerRedux } from 'dva/router';
import moment from 'moment';

const namespace = 'createInvoice';
// const selectState = store => store[namespace];

const defaultFormData = {
  yearMonth: null,
  billType: undefined,
  billCode: null,
  billName: null,
  billTaxRate: undefined,
  billAmt: null, // 应开金额
  billActualAmt: null,
  gsId: null,
  gsName: null,
  billFileId: {
    url: null,
    fileId: null,
    groupId: null,
  },
};

export default {
  namespace,
  state: {
    ...defaultFormData,
  },
  reducers,
  effects: {
    *save({ payload }, { call, put }) {
      const { resetFields } = payload;
      const params = {};
      Object.keys(defaultFormData).forEach(keys => {
        if (!params[keys]) {
          params[keys] = payload[keys];
        }
      });
      params.yearMonth = moment(params.yearMonth).format('YYYY-MM');
      const response = yield call(services.invoiceCreate, { ...params });
      switch (response.code) {
        case dict.SUCCESS:
          message.success('新增发票创建成功！');
          resetFields();
          yield put(
            routerRedux.push({
              pathname: '/financeSys/invoiceConfirm',
            })
          );
          break;
        default:
          message.warning(response.mesg);
          break;
      }
    },

    *changeYear({ payload }, { call }) {
      const { yearMonth, gsId } = payload;
      if (!(yearMonth && gsId)) return;
      const time = moment(yearMonth).format('YYYY-MM');
      const params = { yearMonth: time, gsId };
      const response = yield call(services.getshouldSum, params);
      switch (response.code) {
        case dict.SUCCESS:
          return response.data && response.data.billSum ? response.data.billSum : 0;
        default:
          message.warning('应开金额获取失败，请稍后重试！');
          break;
      }
    },
  },
};
