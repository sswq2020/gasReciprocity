import React, { PureComponent } from 'react';
import { Form, Input, Radio } from 'antd';

const RadioGroup = Radio.Group;
const { TextArea } = Input;
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
    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="油品分类名称">
          {getFieldDecorator('oil.name', {
            initialValue: data.name,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写油品分类名称',
              },
            ],
          })(<Input placeholder="请填写油品分类名称" autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="油品分类描述">
          {getFieldDecorator('oil.description', {
            initialValue: data.description,
            rules: [
              {
                whitespace: true,
                message: '请填写油品分类描述',
              },
            ],
          })(<TextArea rows={4} placeholder="请填写油品分类描述" autoComplete="off" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="是否展示默认">
          {getFieldDecorator('oil.show', {
            initialValue: 2,
          })(
            <RadioGroup>
              <Radio value={1}>是</Radio>
              <Radio value={2}>否</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    );
  }
}
