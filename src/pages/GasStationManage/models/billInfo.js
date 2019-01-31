import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';

const namespace = 'billInfo';
// const selectState = state => state[namespace];

const defaultInvoiceDtoParams = {
  id: null,
  invoiceName: null,
  invoiceTaxpayer: null,
  invoiceAddress: null,
  invoiceTel: null,
  invoiceBank: null,
  invoiceBankCode: null,
};
const defaultReceiveAddressDtoParams = {
  id: null,
  receivingAddressPerson: null,
  receivingAddressTel: null,
  receivingAddress: null,
};

export default {
  namespace,
  state: {
    invoiceDto: { ...defaultInvoiceDtoParams },
    receiveAddressDto: { ...defaultReceiveAddressDtoParams },
  },

  reducers,

  effects: {
    *getDetail(_, { call, put }) {
      const response = yield call(services.getInvoiceAddress);
      switch (response.code) {
        case dict.SUCCESS:
          yield put({
            type: 'overrideStateProps',
            payload: {
              invoiceDto: response.data.invoiceDto,
              receiveAddressDto: response.data.receiveAddressDto,
            },
          });
          break;
        default:
          message.warning('开票信息获取失败，请稍后重试！');
          break;
      }
    },
  },
};
