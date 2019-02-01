import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import { Row, Col, Form, Button, Card } from 'antd';
import dict from '@/utils/dict';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import YearSelect from '@/components/YearSelect';

const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

@connect(({ billCheck, loading }) => ({
  billCheck,
  getListIsLoading: loading.effects['billCheck/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'billCheck/resetListParams' });
  }

  changeListParams = e => {
    e.preventDefault();
    const {
      dispatch,
      form: { validateFields, getFieldsValue },
    } = this.props;
    validateFields(err => {
      if (err) return;
      dispatch({
        type: 'billCheck/changeListParams',
        payload: {
          page: 1,
          ...getFieldsValue(),
        },
      });
    });
  };

  resetListParams = () => {
    const {
      form: { resetFields },
      dispatch,
    } = this.props;
    resetFields();
    dispatch({
      type: 'billCheck/resetListParams',
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.changeListParams} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...formItemWidth}>
            <FormItem label="年份">
              {getFieldDecorator('year', {
                initialValue: moment().format('YYYY'),
              })(<YearSelect before={40} />)}
            </FormItem>
          </Col>
          <Col className="submitButtons" {...formItemWidth}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.resetListParams}>
              重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }

  render() {
    const {
      getListIsLoading,
      billCheck: { data: listData },
    } = this.props;
    const listProps = {
      columns: [
        {
          title: '月份',
          key: 'month',
          align: 'center',
          render: (text, record) => <Fragment>{record.month}</Fragment>,
        },
        {
          title: '发票金额',
          key: 'billSum',
          align: 'center',
          render: (text, record) => <Fragment>{record.billSum} 元</Fragment>,
        },
        {
          title: '到票确认',
          key: 'check',
          align: 'center',
          render: (text, record) => {
            return (
              <span className={record.check === '1' ? 'success_text' : 'error_text'}>
                {dict.billCheckedStatus[record.check]}
              </span>
            );
          },
        },
      ],
      rowKey: 'id',
      dataSource: listData,
      loading: getListIsLoading,
      style: {
        marginTop: 24,
      },
      pagination: false,
    };
    return (
      <PageHeaderWrapper>
        <Card bordered={false} bodyStyle={{ padding: '0 0 20px 0' }}>
          <ListHeaderForm>{this.renderAdvancedForm()}</ListHeaderForm>
          <TableList {...listProps} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
