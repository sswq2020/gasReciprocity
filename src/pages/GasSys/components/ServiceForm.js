import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';
import ImageUpload from '@/components/ImageUpload';
import ImageBox from '@/components/ImageBox';

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
  constructor() {
    super();
    this.state = {
      iconFile: null,
    };
  }

  render() {
    const {
      data,
      form: { getFieldDecorator },
    } = this.props;
    const { iconFile } = this.state;
    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="特色服务ICON">
          {getFieldDecorator('service.icon', {
            initialValue: data.icon,
            rules: [
              {
                required: true,
                message: '请上传特色服务ICON',
              },
            ],
          })(
            iconFile ? (
              <ImageBox
                src="sdf"
                onDelete={() => {
                  this.setState({ iconFile: null });
                }}
              />
            ) : (
              <ImageUpload
                onSuccess={response => {
                  this.setState({ iconFile: response });
                }}
              />
            )
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="特色服务名称">
          {getFieldDecorator('service.name', {
            initialValue: data.name,
            rules: [
              {
                required: true,
                whitespace: true,
                message: '请填写特色服务名称',
              },
              {
                whitespace: true,
                max: 10,
                message: '最多10个字符',
              },
            ],
          })(<Input placeholder="请填写特色服务名称" autoComplete="off" />)}
        </FormItem>
      </Form>
    );
  }
}
