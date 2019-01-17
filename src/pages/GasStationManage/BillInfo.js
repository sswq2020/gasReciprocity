import React, { PureComponent } from 'react';
import { Form, Row, Col } from 'antd';
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

@Form.create()
class CustomizeComponent extends PureComponent {
  render() {
    // const {
    //   billInfo: { detail },
    // } = this.props;

    return (
      <PageHeaderWrapper>
        <ListHeaderForm>
          <Form className={styles.billInfo} layout="inline">
            <FormItemHead>开票信息</FormItemHead>
            <Row>
              <Col {...formItemWidth}>
                <FormItem label="名称:">惠龙易通国际物流股份有限公司</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="纳税人识别号:">92321100661790118F</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="地址:">镇江市长江路758号</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="电话:">0511-85110838</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="开户行:">江苏银行股份有限公司镇江一泉支行</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="账号:">00025727045012</FormItem>
              </Col>
            </Row>
            <FormItemHead>收票人信息</FormItemHead>
            <Row>
              <Col {...formItemWidth}>
                <FormItem label="收票人:">吴经理</FormItem>
              </Col>
              <Col {...formItemWidth}>
                <FormItem label="收票人联系电话:">18012129898</FormItem>
              </Col>
              <Col lg={12} md={24} sm={24}>
                <FormItem label="寄票地址:">
                  江苏省镇江市长江路758号惠龙易通国际物流股份有限公司
                </FormItem>
              </Col>
            </Row>
          </Form>
        </ListHeaderForm>
      </PageHeaderWrapper>
    );
  }
}

export default CustomizeComponent;
