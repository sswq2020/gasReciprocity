import React, { PureComponent } from 'react';
import { Form, Input, DatePicker } from 'antd';

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
            initialValue: data.retailPrice,
            // rules: [
            //   {
            //     required: true,
            //     whitespace: true,
            //     message: '请填写油品分类名称',
            //   },
            // ],
          })(<Input placeholder="请填写零售价" autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="会员折扣">
          {data.memberDiscount}
        </FormItem>
        <FormItem {...formItemLayout} label="会员价">
          {data.memberPrice}
        </FormItem>
        <FormItem {...formItemLayout} label="生效日期">
          {getFieldDecorator('priceApply.effectDate', {
            initialValue: null,
          })(<DatePicker showTime format={dateFormat} />)}
        </FormItem>
      </Form>
    );
  }
}
