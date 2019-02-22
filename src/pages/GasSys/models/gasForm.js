import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
import services from '@/services';

const namespace = 'gasForm';
const selectState = state => state[namespace];

const deleteNullChildren = list => {
  list.forEach(item => {
    if (item.children) {
      if (item.children.length === 0) {
        delete item.children;
      } else {
        deleteNullChildren(item.children);
      }
    }
  });
};

const defaultFormData = {
  oilModelId: undefined,
  oilModelName: null,
  oilRetailPrice: null,
  oilRetailWarn: null,
  oilMemberAgio: null,
  oilMemberPrice: null,
};

const defaultBankCardFormData = {
  bankType: '2', // 开户银行code
  bankAddress: null, // 开户支行／分理处
  name: null, // 户名
  bankCode: null, // 银行账号
  certType: '3', // 证件类型
  certCode: null, // 证件号码
  refCode: null, // 加油站id
  assignCode: null, // 加油站编号=席位号
  bankFile: [
    {
      fileId: null,
      groupId: null,
    },
  ], // 图片
  remark: null, // 备注
};

export default {
  namespace,
  state: {
    formData: {
      ...defaultFormData,
    },
    gasIndexOf: null,
    visible: false,
    isEdit: false,
    provinceList: [],
    featureServiceInfoList: [],
    oilModelInfoList: [],

    bankFormData: {
      ...defaultBankCardFormData,
    },
    bankIndexOf: null,
    bankVisible: false,
    isBankEdit: false,
  },

  reducers,

  effects: {
    *getDict(_, { put, call }) {
      const response = yield call(services.gasDict);
      switch (response.code) {
        case dict.SUCCESS:
          deleteNullChildren(response.data.provinceList);
          yield put({
            type: 'overrideStateProps',
            payload: {
              ...response.data,
            },
          });
          break;
        default:
          message.warning('相关资源获取失败，请稍后重试！');
          break;
      }
    },
    *add({ payload }, { put, select }) {
      const { oilList } = yield select(selectState);
      const { resetFields } = payload;
      resetFields();
      oilList.push({
        id: oilList.length,
        b: 'b',
        c: 'b',
        d: 'b',
        e: 'b',
        f: 'b',
      });
      yield put({
        type: 'overrideStateProps',
        payload: {
          oilList,
        },
      });
      yield put({
        type: 'closeForm',
      });
    },
    *delete({ payload }, { put, select }) {
      const { oilList } = yield select(selectState);
      oilList.splice(payload, 1);
      yield put({
        type: 'overrideStateProps',
        payload: {
          oilList,
        },
      });
      yield put({
        type: 'closeForm',
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
    *openBankForm({ payload }, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          bankVisible: true,
          ...payload,
        },
      });
    },
    *closeBankForm(_, { put }) {
      yield put({
        type: 'overrideStateProps',
        payload: {
          bankVisible: false,
          bankFormData: {
            ...defaultBankCardFormData,
          },
        },
      });
    },
    *createBankForm({ payload }, { put, select }) {
      const { bankFormData } = yield select(selectState);
      bankFormData.assignCode = payload;
      yield put({
        type: 'overrideStateProps',
        payload: {
          bankFormData,
        },
      });
      yield put({
        type: 'openBankForm',
        payload: {
          isBankEdit: false,
        },
      });
    },
  },
};
