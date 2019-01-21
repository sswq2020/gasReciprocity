import React, { PureComponent } from 'react';
import { Form, Input, message } from 'antd';
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

  componentWillMount() {
    const {
      data: {
        fileDto: { url },
      },
    } = this.props;
    this.setState({
      iconFile: url,
    });
  }

  render() {
    const {
      data,
      form: { getFieldDecorator, setFieldsValue },
    } = this.props;
    const { iconFile } = this.state;
    return (
      <Form style={{ marginBottom: -24 }}>
        <FormItem {...formItemLayout} label="特色服务ICON">
          {getFieldDecorator('service.fileDto', {
            initialValue: data.fileDto,
            // rules: [
            //   {
            //     required: true,
            //     message: '请上传特色服务ICON',
            //   },
            // ],
          })(
            iconFile ? (
              <ImageBox
                url={iconFile}
                onDelete={() => {
                  this.setState({ iconFile: null });
                  setFieldsValue({
                    fileDto: {
                      url: null,
                      fileName: null,
                      groupId: null,
                    },
                  });
                }}
              />
            ) : (
              <ImageUpload
                onSuccess={response => {
                  switch (code) {
                    case '000000':
                      this.setState({ iconFile: response });
                      setFieldsValue({
                        fileDto: {
                          url: null,
                          fileName: null,
                          groupId: null,
                        },
                      });
                      break;
                    default:
                      message.warning('图片上传失败，请稍后重试！');
                      break;
                  }
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
