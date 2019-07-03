import React, { PureComponent } from 'react';
import { Form, Input, InputNumber, DatePicker,Radio } from 'antd';
import moment from 'moment';
import dict from '@/utils/dict';

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

const setMemberPrice = (price, agio) => {
  let mP = 0;
  // console.log(price, agio);
  // console.log(Number(price), Number(agio));
  const nP = Number(price);
  const nA = Number(agio);
  if (!!nP && !!nA) {
    mP = nP && nA ? ((nP * 100 * nA) / 10000).toFixed(2) : 0;
  }

  return mP;
};

export default class CustomizeComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    const { data } = this.props;
    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    const {
      form: { getFieldDecorator, setFieldsValue, getFieldValue},
    } = this.props;
    data.adjustPriceType = data.adjustPriceType || "0";
    const adjustPriceType = getFieldValue('adjustPriceType') || data.adjustPriceType ;
    if(adjustPriceType === "0") {
      return (
        <Form style={{ marginBottom: -24 }}>
          <FormItem {...formItemLayout} label="调价模式">
            {getFieldDecorator('adjustPriceType', {
              initialValue: data.adjustPriceType,
            })(
              <RadioGroup>
                <Radio value={dict.adjustByDiscount}>按合同调价</Radio>
                <Radio value={dict.adjustByCheap}>给定最低价</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="油气名称">
            {data.oilModelName}
          </FormItem>
          <FormItem {...formItemLayout} label="挂牌零售价">
            {getFieldDecorator('oilRetailPrice', {
              initialValue: data.oilRetailPrice,
              getValueFromEvent: value => {
                this.setState({
                  data: {
                    ...data,
                    oilMemberPrice: setMemberPrice(value, data.oilMemberAgio),
                  },
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
            {getFieldDecorator('oilMemberAgio', {
              initialValue: data.oilMemberAgio,
            })(<Input disabled autoComplete="off" style={{ width: 'calc(100% - 20px)' }} />)}{' '}
            %
          </FormItem>
          <FormItem {...formItemLayout} label="会员价">
            {data.oilMemberPrice}
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
          <FormItem {...formItemLayout} label="调价模式">
            {getFieldDecorator('adjustPriceType', {
              initialValue: data.adjustPriceType,
            })(
              <RadioGroup>
                <Radio value={dict.adjustByDiscount}>按合同调价</Radio>
                <Radio value={dict.adjustByCheap}>给定最低价</Radio>
              </RadioGroup>
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="油气名称">
            {data.oilModelName}
          </FormItem>
          <FormItem {...formItemLayout} label="挂牌零售价">
            {getFieldDecorator('oilRetailPrice', {
              initialValue: data.oilRetailPrice,
              getValueFromEvent: value => {
                this.setState({
                  data: {
                    ...data,
                    oilMemberPrice: setMemberPrice(value, data.oilMemberAgio),
                  },
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
          <FormItem {...formItemLayout} label="会员价">
            {getFieldDecorator('oilMemberPrice', {
              initialValue: data.oilRetailPrice,
              rules: [
                {
                  required: true,
                  message: '请填写会员价',
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
