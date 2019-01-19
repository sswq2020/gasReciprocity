import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { Form, InputNumber, Input } from 'antd';
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
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="油品名称">
          {getFieldDecorator('oilSelect.type', {
            rules: [
              {
                required: true,
                message: '请选择油品名称',
              },
            ],
          })(<Select placeholder="请选择油品名称" autoComplete="off" data={[]} />)}
        </FormItem>
        <FormItem {...formItemLayout} label="零售价">
          {getFieldDecorator('oilSelect.j', {
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
          {getFieldDecorator('oilSelect.h', {
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
              step={1}
              precision={2}
              style={{ width: 'calc(100% - 20px)' }}
            />
          )}{' '}
          %
        </FormItem>
        <FormItem {...formItemLayout} label="会员折扣">
          {getFieldDecorator('oilSelect.i', {
            initialValue: data.i,
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
              step={1}
              precision={2}
              style={{ width: 'calc(100% - 20px)' }}
            />
          )}{' '}
          %
        </FormItem>
        <FormItem {...formItemLayout} label="会员价">
          {getFieldDecorator('oilSelect.k', {
            initialValue: 20,
          })(<Input readOnly placeholder="请填写会员折扣" autoComplete="off" />)}
        </FormItem>
      </Form>
    );
  }
}

export default CustomizeComponent;
