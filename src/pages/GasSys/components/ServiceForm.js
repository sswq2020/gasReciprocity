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
  render() {
    const {
      data,
      form: { getFieldDecorator, setFieldsValue, getFieldValue },
    } = this.props;
    const iconFile = getFieldValue('service.fsIcon') || data.fsIcon;
    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="特色服务ICON">
          {getFieldDecorator('service.fsIcon', {
            initialValue: data.fsIcon,
            // rules: [
            //   {
            //     required: true,
            //     message: '请上传特色服务ICON',
            //   },
            // ],
          })(
            iconFile.url ? (
              <ImageBox
                url={iconFile.url}
                onDelete={() => {
                  setFieldsValue({
                    'service.fsIcon': {
                      url: null,
                      fileName: null,
                      groupId: null,
                    },
                  });
                }}
              />
            ) : (
              <ImageUpload
                onSuccess={file => {
                  setFieldsValue({
                    'service.fsIcon': {
                      ...file,
                    },
                  });
                }}
              />
            )
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="特色服务名称">
          {getFieldDecorator('service.fsName', {
            initialValue: data.fsName,
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
