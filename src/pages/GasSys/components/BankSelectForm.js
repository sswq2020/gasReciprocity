import { connect } from 'dva';
import React, { PureComponent } from 'react';
import { Form, Row, Col, Input } from 'antd';
import { imgHost } from '@/services/mock';
import Select from '@/components/Select';
import ImageUpload from '@/components/ImageUpload';
import ImageBox from '@/components/ImageBox';
import styles from './BankSelectForm.less';

const imgUrl = `${imgHost[ENV]}/action/hletong/file/gasDownload?file_id=`;

const FormItem = Form.Item;
const { TextArea } = Input;
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

const photoItemLayout = {
  labelCol: {
    xs: { span: 6 },
    sm: { span: 6 },
    md: { span: 3 },
  },
  wrapperCol: {
    xs: { span: 18 },
    sm: { span: 18 },
    md: { span: 21 },
  },
};

const formItemWidth = {
  lg: 12,
  md: 12,
  sm: 24,
};

const certTypeList = [{ itemCode: '营业执照', itemName: '营业执照' }];
const bankTypeList = [{ itemCode: '中国建设银行', itemName: '中国建设银行' }];

@connect(({ gasForm }) => ({
  gasForm,
}))
class CustomizeComponent extends PureComponent {
  render() {
    const {
      data,
      form: { getFieldDecorator, setFieldsValue, getFieldValue },
    } = this.props;
    const bankFile = getFieldValue('bankFile') || data.bankFile;
    return (
      <Form className={styles.bankSelectForm}>
        <Row>
          <Col lg={24} md={24} sm={24}>
            <FormItem {...photoItemLayout} label="银行账户图片">
              {getFieldDecorator('bankFile', {
                initialValue: data.bankFile,
                rules: [
                  {
                    required: true,
                    validator: (rule, value, callback) => {
                      if (value.fileId === null) {
                        callback('请上传银行账户图片');
                      }
                      callback();
                    },
                  },
                ],
              })(
                bankFile.fileId ? (
                  <ImageBox
                    url={`${imgUrl}${bankFile.fileId}`}
                    onDelete={() => {
                      setFieldsValue({
                        bankFile: {
                          fileId: null,
                          groupId: null,
                        },
                      });
                    }}
                  />
                ) : (
                  <ImageUpload
                    onSuccess={file => {
                      setFieldsValue({
                        bankFile: {
                          ...file,
                        },
                      });
                    }}
                  />
                )
              )}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem {...formItemLayout} label="开户银行:">
              {getFieldDecorator('bankType', {
                initialValue: data.bankType,
                rules: [
                  {
                    required: true,
                    message: '请选择开户银行',
                  },
                ],
              })(<Select placeholder="请选择" data={bankTypeList} />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem {...formItemLayout} label="开户支行:">
              {getFieldDecorator('bankAddress', {
                initialValue: data.bankAddress,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入开户支行/分理处',
                  },
                ],
              })(<Input placeholder="请输入开户支行/分理处" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem {...formItemLayout} label="户名:">
              {getFieldDecorator('name', {
                initialValue: data.name,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写户名',
                  },
                ],
              })(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem {...formItemLayout} label="银行账号:">
              {getFieldDecorator('bankCode', {
                initialValue: data.bankCode,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写银行账号',
                  },
                ],
              })(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem {...formItemLayout} label="证件类型:">
              {getFieldDecorator('certType', {
                initialValue: data.certType,
                rules: [
                  {
                    required: true,
                    message: '请选择证件类型',
                  },
                ],
              })(<Select placeholder="请选择" data={certTypeList} />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem {...formItemLayout} label="证件号码:">
              {getFieldDecorator('certCode', {
                initialValue: data.certCode,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写证件号码',
                  },
                ],
              })(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem {...formItemLayout} label="签约席位号:">
              {getFieldDecorator('assignCode', {
                initialValue: data.assignCode,
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请填写签约席位号',
                  },
                ],
              })(<Input placeholder="请输入指定账号签约席位号" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem {...formItemLayout} label="备注:">
              {getFieldDecorator('remark', {
                initialValue: data.remark,
              })(<TextArea placeholder="请输入" autoComplete="off" rows={4} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default CustomizeComponent;
