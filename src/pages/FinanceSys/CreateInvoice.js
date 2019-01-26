import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Row, Col, Input, Select, Button, DatePicker } from 'antd';
import regexps from '@/utils/regexps';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormItemHead from '@/components/FormItemHead';
import ImageBox from '@/components/ImageBox';
import ImageUpload from '@/components/ImageUpload';
import moment from 'moment';
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
                    initialValue: formData.photo,
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
                    initialValue: formData.year,
                    getValueFromEvent: value => {
                      const date = moment(value).format('YYYY-MM');
                      dispatch({
                        type: 'createInvoice/changeYear',
                        payload: { date },
                      });
                      return value;
                    },
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
                    initialValue: formData.gasStation,
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
                    initialValue: formData.invoiceType,
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
                    initialValue: formData.invoiceNumList,
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
                    initialValue: formData.invoicePartyName,
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
                    initialValue: formData.taxRate,
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
                <FormItem label="应开金额">{formData.shouldsum}</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="实开金额">
                  {getFieldDecorator('formData.sum', {
                    initialValue: formData.sum,
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
                router.push('/financeSys/invoiceConfirm');
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
                  dispatch({
                    type: 'createInvoice/save',
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
