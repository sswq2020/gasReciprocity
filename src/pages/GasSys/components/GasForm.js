import React, { PureComponent } from 'react';
import { Form, Row, Col, Input } from 'antd';
import Select from '@/components/Select';
import FormItemHead from '@/components/FormItemHead';
// import ListHeaderForm from '@/components/ListHeaderForm';

const FormItem = Form.Item;

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

@Form.create()
class CustomizeComponent extends PureComponent {
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      // <ListHeaderForm>
      <Form>
        <FormItemHead>账号管理员信息：</FormItemHead>
        <Row>
          <Col lg={8} md={12} sm={24}>
            <FormItem {...formItemLayout} label="会员名">
              {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <FormItem {...formItemLayout} label="加油站名称">
              {getFieldDecorator('appId')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <FormItem {...formItemLayout} label="加油站状态">
              {getFieldDecorator('auditorId', {
                initialValue: null,
              })(<Select placeholder="请选择" style={{ width: '100%' }} data={[]} />)}
            </FormItem>
          </Col>
        </Row>
        <FormItemHead>加油站信息：</FormItemHead>
        <Row>
          <Col lg={8} md={12} sm={24}>
            <FormItem {...formItemLayout} label="会员名">
              {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <FormItem {...formItemLayout} label="加油站名称">
              {getFieldDecorator('appId')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col lg={8} md={12} sm={24}>
            <FormItem {...formItemLayout} label="加油站状态">
              {getFieldDecorator('auditorId', {
                initialValue: null,
              })(<Select placeholder="请选择" style={{ width: '100%' }} data={[]} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
      // </ListHeaderForm>
    );
  }
}

export default CustomizeComponent;
