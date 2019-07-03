import React, { PureComponent } from 'react';
import { Form, Input, InputNumber, DatePicker, Radio } from 'antd';
import Select from '@/components/Select';
import moment from 'moment';
import dict from '@/utils/dict';
import { DictToSelect } from '@/utils/utils';

const adjustPriceTypeData = DictToSelect(dict.adjustPriceType);

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 7 },
    md: { span: 7 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 17 },
    md: { span: 17 },
  },
};

export default class CustomizeComponent extends PureComponent {
  render() {
    const {
      data,
      form: { getFieldDecorator, setFieldsValue, getFieldValue },
    } = this.props;

    const setMemberPrice = (price, agio, ISDiscount= true) => {
      debugger
      let mP = 0;
      const nP = Number(price);
      const nA = Number(agio);
      if (ISDiscount) {
        if (!!nP && !!nA) {
          mP = nP && nA ? ((nP * 100 * nA) / 10000).toFixed(2) : 0;
        }
      } else {
        if (!!nP && !!nA && nP > nA) {
          mP = ((nP * 1000 - nA *1000) / 1000).toFixed(2);
        }else {
          mP = nP;
        }
      }
      debugger
      return mP
    };

    getFieldDecorator('oilChangeType', {
      initialValue: data.oilChangeType,
    });
    debugger
    const oilChangeType = data.oilChangeType;
    if (oilChangeType === "0") {
      return (
        <Form style={{ marginBottom: -24 }}>
          <FormItem {...formItemLayout} label="油气名称">
            {data.oilModelName}
          </FormItem>
          <FormItem {...formItemLayout} label="挂牌零售价">
            {getFieldDecorator('oilRetailPrice', {
              initialValue: data.oilRetailPrice,
              getValueFromEvent: value => {
                setFieldsValue({
                  'oilMemberPrice': setMemberPrice(value, data.oilMemberAgio)
                });
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请填写挂牌零售价',
                },
              ],
            })(
              <InputNumber
                placeholder="请填写挂牌零售价"
                autoComplete="off"
                min={0}
                step={1}
                precision={2}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="会员折扣">
            {data.oilMemberAgio}
            %
          </FormItem>
          <FormItem {...formItemLayout} label="会员价">
            {getFieldDecorator('oilMemberPrice', {
              initialValue: data.oilMemberPrice,
            })(
              <InputNumber
                style={{ width: '100%' }}
                readOnly
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="生效日期">
            {getFieldDecorator('effectTime', {
              initialValue: moment(),
            })(
              <DatePicker
                showTime
                allowClear={false}
                style={{ width: '100%' }}
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={current => {
                  return current && current.valueOf() < new Date().setDate(new Date().getDate() - 1);
                }}
              />
            )}
          </FormItem>
        </Form>
      );
    } else {
      return (
        <Form style={{ marginBottom: -24 }}>
          <FormItem {...formItemLayout} label="油气名称">
            {data.oilModelName}
          </FormItem>
          <FormItem {...formItemLayout} label="挂牌零售价">
            {getFieldDecorator('oilRetailPrice', {
              initialValue: data.oilRetailPrice,
              getValueFromEvent: value => {
                setFieldsValue({
                  oilMemberPrice: setMemberPrice(value, data.oilMemberAgio, false),
                });
                return value;
              },
              rules: [
                {
                  required: true,
                  message: '请填写挂牌零售价',
                },
              ],
            })(
              <InputNumber
                placeholder="请填写挂牌零售价"
                autoComplete="off"
                min={0}
                step={1}
                precision={2}
                style={{ width: '100%' }}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="会员折扣">
            {data.oilMemberAgio}
          </FormItem>
          <FormItem {...formItemLayout} label="会员价">
            {getFieldDecorator('oilMemberPrice', {
              initialValue: data.oilMemberPrice,
            })(
              <InputNumber
                style={{ width: '100%' }}
                disabled
                autoComplete="off"
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="生效日期">
            {getFieldDecorator('effectTime', {
              initialValue: moment(),
            })(
              <DatePicker
                showTime
                allowClear={false}
                style={{ width: '100%' }}
                format="YYYY-MM-DD HH:mm:ss"
                disabledDate={current => {
                  return current && current.valueOf() < new Date().setDate(new Date().getDate() - 1);
                }}
              />
            )}
          </FormItem>
        </Form>
      );
    }

  }
}
