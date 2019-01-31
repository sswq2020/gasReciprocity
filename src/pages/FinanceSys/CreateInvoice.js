import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Form, Row, Col, Input, Select, Button, DatePicker } from 'antd';
import regexps from '@/utils/regexps';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormItemHead from '@/components/FormItemHead';
import { hostList } from '@/services/mock';
import ImageUpload from '@/components/ImageUpload';
import ImageBox from '@/components/ImageBox';
import moment from 'moment';
import styles from './components/financeForm.less';
import GasStationPop from '@/components/GasStationPop/index';

const imgUrl = `//${hostList[ENV]}/action/hletong/file/gasDownload?file_id=`;
const SearCh = Input.Search;

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
  openPop = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'gasStationPop/openPopup',
    });
  };

  render() {
    const {
      dispatch,
      createInvoice,
      form: {
        getFieldDecorator,
        setFieldsValue,
        resetFields,
        getFieldsValue,
        getFieldValue,
        validateFields,
      },
    } = this.props;
    getFieldDecorator('gsId');
    const photo = getFieldValue('photo') || createInvoice.photo;
    return (
      <PageHeaderWrapper>
        <Fragment>
          <Form className={styles.financeForm}>
            <FormItemHead>新增发票</FormItemHead>
            <Row>
              <Col lg={24} md={24} sm={24}>
                <FormItem label="发票照片">
                  {getFieldDecorator('photo', {
                    initialValue: createInvoice.photo,
                    rules: [
                      {
                        required: true,
                        message: '请上传特色服务ICON',
                      },
                    ],
                  })(
                    photo.fileId ? (
                      <ImageBox
                        url={`${imgUrl}${photo.fileId}`}
                        onDelete={() => {
                          setFieldsValue({
                            photo: {
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
                            photo: {
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
                <FormItem label="年月">
                  {getFieldDecorator('yearMonth', {
                    getValueFromEvent: value => {
                      const date = moment(value).format('YYYY-MM');
                      dispatch({
                        type: 'createInvoice/changeYear',
                        payload: { date },
                      }).then(res => {
                        setFieldsValue({
                          billAmt: res,
                        });
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
                  {getFieldDecorator('gsName')(
                    <SearCh
                      enterButton
                      readOnly
                      onSearch={this.openPop}
                      placeholder="请点击"
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="发票类型">
                  {getFieldDecorator('billType', {
                    initialValue: createInvoice.billType,
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
                  {getFieldDecorator('billCode', {
                    initialValue: createInvoice.billCode,
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
                  {getFieldDecorator('billName', {
                    initialValue: createInvoice.billName,
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
                  {getFieldDecorator('billTaxRate', {
                    initialValue: createInvoice.billTaxRate,
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
                <FormItem label="应开金额">
                  {getFieldDecorator('billAmt')(<Input readOnly autoComplete="off" />)}
                </FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="实开金额">
                  {getFieldDecorator('billActualAmt', {
                    initialValue: createInvoice.billActualAmt,
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
        <GasStationPop
          onOk={data => {
            data = data || { id: null, gsName: null };
            setFieldsValue({
              gsId: data.id,
              gsName: data.gsName,
            });
          }}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Page;
