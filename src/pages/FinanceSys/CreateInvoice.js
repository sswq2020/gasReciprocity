import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Row, Col, Input, Select, Button, Modal, DatePicker } from 'antd';
import regexps from '@/utils/regexps';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormItemHead from '@/components/FormItemHead';
import ImageBox from '@/components/ImageBox';
import ImageUpload from '@/components/ImageUpload';
import styles from './components/financeForm.less';

const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Select.Option key={i.toString(36) + i}>{i.toString(36) + i}</Select.Option>);
}

const { MonthPicker } = DatePicker;
const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

@connect(({ createInvoice }) => ({
  createInvoice,
}))
@Form.create()
class Page extends PureComponent {
  render() {
    const {
      dispatch,
      data = {},
      createInvoice: { formData },
      form: { getFieldDecorator, resetFields, getFieldsValue, validateFields },
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Fragment>
          <Form className={styles.financeForm}>
            <FormItemHead>新增发票</FormItemHead>
            <Row>
              <Col lg={24} md={24} sm={24}>
                <FormItem label="发票照片">
                  {getFieldDecorator('formData.photo', {
                    initialValue: data.photo,
                    rules: [
                      {
                        required: true,
                        message: '请上传发票照片',
                      },
                    ],
                  })(
                    formData.photo.url ? (
                      <ImageBox
                        src="sdf"
                        onDelete={() => {
                          dispatch({
                            type: 'createInvoice/updateStateProps',
                            payload: {
                              name: 'photo',
                              value: null,
                            },
                          });
                        }}
                      />
                    ) : (
                      <ImageUpload
                        onSuccess={response => {
                          dispatch({
                            type: 'createInvoice/updateStateProps',
                            payload: {
                              name: 'photo',
                              value: response,
                            },
                          });
                        }}
                      />
                    )
                  )}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="年月">
                  {getFieldDecorator('formData.year', {
                    initialValue: data.year,
                    rules: [
                      {
                        required: true,
                        message: '请填写年月',
                      },
                    ],
                  })(<MonthPicker style={{ width: '100%' }} />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="加油站名称">
                  {getFieldDecorator('formData.gasStation', {
                    initialValue: data.gasStation,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写加油站名称',
                      },
                      {
                        whitespace: true,
                        max: 20,
                        message: '最多20个字符',
                      },
                    ],
                  })(<Input placeholder="请输入加油站名称" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="发票类型">
                  {getFieldDecorator('formData.invoiceType', {
                    initialValue: data.invoiceType,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请选择发票类型',
                      },
                    ],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      {children}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="发票号码">
                  {getFieldDecorator('formData.invoiceNumList', {
                    initialValue: data.invoiceNumList,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写发票号码',
                      },
                      {
                        pattern: regexps.number,
                        message: '请填写纯数字',
                      },
                      {
                        whitespace: true,
                        max: 10,
                        message: '最多10个字符',
                      },
                    ],
                  })(<Input placeholder="请输入发票号码" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="开票房名称">
                  {getFieldDecorator('formData.invoicePartyName', {
                    initialValue: data.invoicePartyName,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写开票房名称',
                      },
                    ],
                  })(<Input placeholder="请输入开票房名称" autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="税率">
                  {getFieldDecorator('formData.taxRate', {
                    initialValue: data.taxRate,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请选择税率',
                      },
                    ],
                  })(
                    <Select placeholder="请选择" style={{ width: '100%' }}>
                      {children}
                    </Select>
                  )}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="应开金额">{}</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="实开金额">
                  {getFieldDecorator('formData.sum', {
                    initialValue: data.sum,
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请填写实开金额',
                      },
                    ],
                  })(<Input placeholder="请输入" autoComplete="off" />)}
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
                  onOk: () => {
                    router.push('/financeSys/invoiceConfirm');
                  },
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
