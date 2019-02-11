import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { Form, InputNumber } from 'antd';
import _ from 'lodash';
import Select from '@/components/Select';
// import dict from '@/utils/dict';
// import regexps from '@/utils/regexps';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 18 },
  },
};

@connect(({ gasForm }) => ({
  gasForm,
}))
class CustomizeComponent extends PureComponent {
  render() {
    const {
      data,
      hasSelect,
      selectList,
      form: { getFieldDecorator, setFieldsValue, getFieldValue },
    } = this.props;

    getFieldDecorator('oilSelect.oilModelName', {
      initialValue: data.oilModelName,
    });

    const setMemberPrice = (price, agio) => {
      let mP = 0;
      // console.log(price, agio);
      // console.log(Number(price), Number(agio));
      const nP = Number(price);
      const nA = Number(agio);
      if (!!nP && !!nA) {
        mP = nP && nA ? ((nP * 100 * nA) / 10000).toFixed(2) : 0;
      }
      setFieldsValue({
        'oilSelect.oilMemberPrice': mP,
      });
    };

    const selectData = _.differenceBy(
      selectList,
      hasSelect.filter(item => item.itemCode !== data.oilModelId),
      'itemCode'
    );

    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="油品名称">
          {getFieldDecorator('oilSelect.oilModelId', {
            initialValue: data.oilModelId,
            getValueFromEvent: value => {
              setFieldsValue({
                'oilSelect.oilModelName': selectList.filter(r => r.itemCode === value)[0].itemName,
              });
              return value;
            },
            rules: [
              {
                required: true,
                message: '请选择油品名称',
              },
            ],
          })(<Select placeholder="请选择油品名称" autoComplete="off" data={selectData} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="零售价">
          {getFieldDecorator('oilSelect.oilRetailPrice', {
            initialValue: data.oilRetailPrice,
            getValueFromEvent: value => {
              setMemberPrice(value, getFieldValue('oilSelect.oilMemberAgio'));
              return value;
            },
            rules: [
              {
                required: true,
                message: '请填写零售价',
              },
            ],
          })(
            <InputNumber
              placeholder="请填写零售价"
              autoComplete="off"
              min={0}
              step={1}
              precision={2}
              style={{ width: '100%' }}
            />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="零售价浮动预警">
          {getFieldDecorator('oilSelect.oilRetailWarn', {
            initialValue: data.oilRetailWarn,
            rules: [
              {
                required: true,
                message: '请填写零售价浮动预警',
              },
            ],
          })(
            <InputNumber
              placeholder="请填写零售价浮动预警"
              autoComplete="off"
              min={0}
              max={100}
              step={1}
              precision={2}
              style={{ width: 'calc(100% - 20px)' }}
            />
          )}{' '}
          %
        </FormItem>
        <FormItem {...formItemLayout} label="会员折扣">
          {getFieldDecorator('oilSelect.oilMemberAgio', {
            initialValue: data.oilMemberAgio,
            getValueFromEvent: value => {
              setMemberPrice(getFieldValue('oilSelect.oilRetailPrice'), value);
              return value;
            },
            rules: [
              {
                required: true,
                message: '请填写会员折扣',
              },
            ],
          })(
            <InputNumber
              placeholder="请填写会员折扣"
              autoComplete="off"
              min={0}
              max={100}
              step={1}
              precision={2}
              style={{ width: 'calc(100% - 20px)' }}
            />
          )}{' '}
          %
        </FormItem>
        <FormItem {...formItemLayout} label="会员价">
          {getFieldDecorator('oilSelect.oilMemberPrice', {
            initialValue: data.oilMemberPrice,
          })(
            <InputNumber
              style={{ width: '100%' }}
              readOnly
              placeholder="请填写会员折扣"
              autoComplete="off"
            />
          )}
        </FormItem>
      </Form>
    );
  }
}

export default CustomizeComponent;
