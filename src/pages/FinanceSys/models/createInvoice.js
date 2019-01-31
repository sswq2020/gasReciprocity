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
  photo: {
    url: null,
    fileName: null,
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
      params.billFileId = [params.photo.fileid];
      delete params.photo;
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
          message.warning('新增发票创建失败，请稍后重试！');
          break;
      }
    },

    *changeYear({ payload }, { call }) {
      const { yearMonth, gsId } = payload;
      if (!(yearMonth && gsId)) return;
      const time = moment(yearMonth).format('YYYY-MM');
      const params = { yearMonth: time, gsId };
      const response = yield call(services.billCheckList, params);
      switch (response.code) {
        case dict.SUCCESS:
          return response.data[0].billSum;
        // break;
        default:
          message.warning('应开金额失败，请稍后重试！');
          break;
      }
    },
  },
};
