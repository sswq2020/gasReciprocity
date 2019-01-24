import React, { PureComponent, Fragment } from 'react';
import { Form, Row, Col, Input, Button, Modal } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormItemHead from '@/components/FormItemHead';
import styles from './components/financeForm.less';

const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

const FormItem = Form.Item;

@connect(({ infoPreserve, loading }) => ({
  infoPreserve,
  getListIsLoading: loading.effects['infoPreserve/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'infoPreserve/getDetail' });
  }

  render() {
    const {
      infoPreserve: { formData },
      form: { getFieldDecorator, resetFields, getFieldsValue, validateFields },
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Fragment>
          <Form className={styles.financeForm}>
            <FormItemHead>开票信息</FormItemHead>
            <Row>
              <Col {...formItemWidth}>
                <FormItem label="名称">
                  {getFieldDecorator('formData.name', {
                    initialValue: formData.name,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写名称',
                      },
                    ],
                  })(<Input placeholder="请输入名称" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="纳税人识别号:">
                  {getFieldDecorator('formData.taxPayerIdNum', {
                    initialValue: formData.taxPayerIdNum,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写纳税人识别号',
                      },
                    ],
                  })(<Input placeholder="请输入纳税人识别号" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="地址:">
                  {getFieldDecorator('formData.adress', {
                    initialValue: formData.adress,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写地址',
                      },
                    ],
                  })(<Input placeholder="请输入地址" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="电话:">
                  {getFieldDecorator('formData.tel', {
                    initialValue: formData.tel,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写电话',
                      },
                    ],
                  })(<Input placeholder="请输入电话" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="开户行:">
                  {getFieldDecorator('formData.bank', {
                    initialValue: formData.bank,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写开户行',
                      },
                    ],
                  })(<Input placeholder="请输入开户行" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="账号:">
                  {getFieldDecorator('formData.account', {
                    initialValue: formData.account,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写账号',
                      },
                    ],
                  })(<Input placeholder="请输入账号" autoComplete="off" />)}
                </FormItem>
              </Col>
            </Row>
            <FormItemHead>收票地址信息</FormItemHead>
            <Row>
              <Col {...formItemWidth}>
                <FormItem label="收票人:">
                  {getFieldDecorator('formData.ticketer', {
                    initialValue: formData.ticketer,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写收票人',
                      },
                    ],
                  })(<Input placeholder="请输入收票人" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="收票人联系电话:">
                  {getFieldDecorator('formData.ticketerTel', {
                    initialValue: formData.ticketerTel,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写收票人联系电话',
                      },
                    ],
                  })(<Input placeholder="请输入收票人联系电话" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col lg={12} md={24} sm={24}>
                <FormItem label="寄票地址:">
                  {getFieldDecorator('formData.ticketerTel', {
                    initialValue: formData.ticketerTel,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写收票人联系电话',
                      },
                    ],
                  })(<Input placeholder="请输入收票人联系电话" autoComplete="off" />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div className={styles.footer}>
            <Button
              onClick={() => {
                Modal.confirm({
                  autoFocusButton: null,
                  title: '取消操作',
                  content: '你确定保存前取消？',
                  okText: '确认',
                  cancelText: '取消',
                  onOk: () => {},
                });
              }}
            >
              取消
            </Button>
            <Button
              onClick={() => {
                validateFields(errors => {
                  if (errors) {
                    return;
                  }
                  onOk(
                    {
                      ...getFieldsValue(),
                    },
                    resetFields
                  );
                });
              }}
              type="primary"
            >
              保存
            </Button>
          </div>
        </Fragment>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
