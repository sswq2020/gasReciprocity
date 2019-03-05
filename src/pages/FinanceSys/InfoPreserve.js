import React, { PureComponent, Fragment } from 'react';
import { Form, Row, Col, Input, Button } from 'antd';
// import router from 'umi/router';
import { connect } from 'dva';
import regexps from '@/utils/regexps';
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
  getListIsLoading: loading.effects['infoPreserve/getInvoiceAddress'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'infoPreserve/getInvoiceAddress' });
  }

  render() {
    const {
      dispatch,
      infoPreserve: { invoiceDto, receiveAddressDto },
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
                  {getFieldDecorator('_invoiceDto_.invoiceName', {
                    initialValue: invoiceDto.invoiceName,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写名称',
                      },
                      {
                        pattern: regexps.china,
                        message: '输入中文',
                      },
                      {
                        max: 20,
                        message: '不超过20位',
                      },
                    ],
                  })(<Input placeholder="请输入名称" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="纳税人识别号:">
                  {getFieldDecorator('_invoiceDto_.invoiceTaxpayer', {
                    initialValue: invoiceDto.invoiceTaxpayer,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写纳税人识别号',
                      },
                      {
                        max: 20,
                        message: '不超过20位',
                      },
                    ],
                  })(<Input placeholder="请输入纳税人识别号" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="地址:">
                  {getFieldDecorator('_invoiceDto_.invoiceAddress', {
                    initialValue: invoiceDto.invoiceAddress,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写地址',
                      },
                      {
                        max: 20,
                        message: '不超过20位',
                      },
                    ],
                  })(<Input placeholder="请输入地址" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="电话:">
                  {getFieldDecorator('_invoiceDto_.invoiceTel', {
                    initialValue: invoiceDto.invoiceTel,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写电话',
                      },
                      {
                        max: 20,
                        message: '不超过20位',
                      },
                    ],
                  })(<Input placeholder="请输入电话" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="开户行:">
                  {getFieldDecorator('_invoiceDto_.invoiceBank', {
                    initialValue: invoiceDto.invoiceBank,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写开户行',
                      },
                      {
                        max: 20,
                        message: '不超过20位',
                      },
                    ],
                  })(<Input placeholder="请输入开户行" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="账号:">
                  {getFieldDecorator('_invoiceDto_.invoiceBankCode', {
                    initialValue: invoiceDto.invoiceBankCode,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写账号',
                      },
                      {
                        max: 20,
                        message: '不超过20位',
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
                  {getFieldDecorator('_receiveAddressDto_.receivingAddressPerson', {
                    initialValue: receiveAddressDto.receivingAddressPerson,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写收票人',
                      },
                      {
                        max: 20,
                        message: '不超过20位',
                      },
                    ],
                  })(<Input placeholder="请输入收票人" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="收票人联系电话:">
                  {getFieldDecorator('_receiveAddressDto_.receivingAddressTel', {
                    initialValue: receiveAddressDto.receivingAddressTel,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写收票人联系电话',
                      },
                      {
                        pattern: regexps.mobPhone,
                        message: '不符合手机格式',
                      },
                    ],
                  })(<Input placeholder="请输入收票人联系电话" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="寄票地址:">
                  {getFieldDecorator('_receiveAddressDto_.receivingAddress', {
                    initialValue: receiveAddressDto.receivingAddress,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写寄票地址',
                      },
                      {
                        max: 50,
                        message: '不超过50位',
                      },
                    ],
                  })(<Input placeholder="请输入寄票地址" autoComplete="off" />)}
                </FormItem>
              </Col>
            </Row>
          </Form>
          <div className={styles.footer}>
            {/* <Button
            onClick={() => {
              router.goBack();
            }}
          >
            取消
          </Button> */}
            <Button
              onClick={() => {
                validateFields(errors => {
                  if (errors) {
                    return;
                  }
                  dispatch({
                    type: 'infoPreserve/save',
                    payload: {
                      ...getFieldsValue(),
                      resetFields,
                    },
                  });
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
