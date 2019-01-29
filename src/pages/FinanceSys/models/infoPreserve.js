import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';
import { routerRedux } from 'dva/router';

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
    *save({ payload }, { call, put, select }) {
      const { _invoiceDto_, _receiveAddressDto_ } = payload; // 双向绑定的更改值
      const { invoiceDto, receiveAddressDto } = yield select(selectState); // state里获取的id
      const { id: invoiceDtoId } = invoiceDto;
      const { id: receiveAddressDtoId } = receiveAddressDto;
      const data = {
        invoiceDto: { invoiceDto, ..._invoiceDto_ },
        receiveAddressDto: { receiveAddressDto, ..._receiveAddressDto_ },
      };
      const flag = !!(invoiceDtoId && receiveAddressDtoId);
      const servicesUrl = flag ? services.invoiceAddressUpdate : services.invoiceAddressCreate;
      const response = yield call(servicesUrl, data);
      switch (response.code) {
        case dict.SUCCESS:
          message.success(`开票、收票地址信息${flag ? '编辑' : '创建'}成功！`);
          yield put(
            routerRedux.push({
              pathname: '/financeSys',
            })
          );
          break;
        default:
          message.warning('开票、收票地址信息创建失败，请稍后重试！');
          break;
      }
    },
  },
};
