import { message } from 'antd';
import { reducers, ERR_OK } from '@/utils/utils';
import services from '@/services';

const namespace = 'createInvoice';
// const selectState = store => store[namespace];

const defaultFormData = {
  year: null,
  gasStation: null,
  invoiceType: null,
  invoiceNumList: null,
  invoicePartyName: null,
  taxRate: null,
  sum: null,
  photo: {
    url: null,
  },
};

export default {
  namespace,
  state: {
    formData: {
      ...defaultFormData,
    },
  },
  reducers,
  effects: {
    *save({ payload }, { call, put }) {
      const { formData } = payload;
      const response = yield call(services.gasCreate, formData);
      switch (response.code) {
        case ERR_OK:
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
  },
};
