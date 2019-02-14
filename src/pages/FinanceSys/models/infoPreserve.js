import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';

const namespace = 'infoPreserve';
const selectState = state => state[namespace];
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
    *getInvoiceAddress(_, { call, put }) {
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
          message.warning('收票地址查询失败，请稍后重试！');
      }
    },
    *save({ payload }, { call, select }) {
      const { _invoiceDto_, _receiveAddressDto_ } = payload; // 双向绑定的更改值
      const { invoiceDto, receiveAddressDto } = yield select(selectState); // state里获取的id
      const data = {
        invoiceDto: Object.assign({}, invoiceDto, _invoiceDto_),
        receiveAddressDto: Object.assign({}, receiveAddressDto, _receiveAddressDto_),
      };
      const response = yield call(services.invoiceAddressUpdate, data);
      switch (response.code) {
        case dict.SUCCESS:
          message.success('开票、收票地址信息编辑成功！');
          break;
        default:
          message.warning('开票、收票地址信息创建失败，请稍后重试！');
          break;
      }
    },
  },
};
