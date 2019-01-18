import React, { PureComponent } from 'react';
import { Form, Row, Col } from 'antd';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormItemHead from '@/components/FormItemHead';
import ListHeaderForm from '@/components/ListHeaderForm';
import styles from './BillInfo.less';

const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};
const FormItem = Form.Item;

@connect(({ billInfo, loading }) => ({
  billInfo,
  getListIsLoading: loading.effects['billInfo/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'billInfo/getDetail' });
  }

  render() {
    const {
      billInfo: { detail },
    } = this.props;
    return (
      <PageHeaderWrapper>
        <ListHeaderForm>
          <Form className={styles.billInfo} layout="inline">
            <FormItemHead>开票信息</FormItemHead>
            <Row>
              <Col {...formItemWidth}>
                <FormItem label="名称:">{detail.name}</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="纳税人识别号:">{detail.taxPayerIdNum}</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="地址:">{detail.adress}</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="电话:">{detail.tel}</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="开户行:">{detail.bank}</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="账号:">{detail.account}</FormItem>
              </Col>
            </Row>
            <FormItemHead>收票地址信息</FormItemHead>
            <Row>
              <Col {...formItemWidth}>
                <FormItem label="收票人:">{detail.ticketer}</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="收票人联系电话:">{detail.ticketerTel}</FormItem>
              </Col>
              <Col lg={12} md={24} sm={24}>
                <FormItem label="寄票地址:">{detail.adress2}</FormItem>
              </Col>
            </Row>
          </Form>
        </ListHeaderForm>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
