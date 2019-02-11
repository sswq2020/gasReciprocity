import React, { PureComponent } from 'react';
import { Form, InputNumber, DatePicker } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;

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

  componentWillMount() {
    const { data } = this.props;
    this.setState({
      data,
    });
  }

  render() {
    const { data } = this.state;
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="油品名称">
          {data.oilModelName}
        </FormItem>
        <FormItem {...formItemLayout} label="零售价">
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
        <FormItem {...formItemLayout} label="会员折扣">
          {data.oilMemberAgio} %
        </FormItem>
        <FormItem {...formItemLayout} label="会员价">
          {data.oilMemberPrice}
        </FormItem>
        <FormItem {...formItemLayout} label="生效日期">
          {getFieldDecorator('effectTime', {
            initialValue: moment(),
          })(
            <DatePicker
              allowClear={false}
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
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
