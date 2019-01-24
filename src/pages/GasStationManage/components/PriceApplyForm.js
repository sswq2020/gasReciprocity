import React, { PureComponent } from 'react';
import { Form, Input, DatePicker } from 'antd';
import regexps from '@/utils/regexps';
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

export default class CustomizeComponent extends PureComponent {
  render() {
    const {
      data,
      form: { getFieldDecorator },
    } = this.props;
    const dateFormat = 'YYYY-MM-DD HH:mm:ss';
    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="油品名称">
          {data.fuelName}
        </FormItem>
        <FormItem {...formItemLayout} label="零售价">
          {getFieldDecorator('priceApply.retailPrice', {
            initialValue: data.b,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写零售价',
              },
              {
                pattern: regexps.decimal2,
                message: '小数位必须2位',
              },
            ],
          })(<Input placeholder="请填写零售价" autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="会员折扣">
          {data.c}
        </FormItem>
        <FormItem {...formItemLayout} label="会员价">
          {data.d}
        </FormItem>
        <FormItem {...formItemLayout} label="生效日期">
          {getFieldDecorator('priceApply.effectDate', {
            initialValue: moment(data.f),
          })(<DatePicker showTime format={dateFormat} />)}
        </FormItem>
      </Form>
    );
  }
}
