import React, { PureComponent, Fragment } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
// import router from 'umi/router';
// import Link from 'umi/link';
import { Row, Col, Form, Button, Card, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
// import Select from '@/components/Select';

const FormItem = Form.Item;

@connect(({ infoList, loading }) => ({
  infoList,
  getListIsLoading: loading.effects['infoList/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'infoList/resetListParams' });
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
        type: 'infoList/changeListParams',
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
      type: 'infoList/resetListParams',
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const dateFormat = 'YYYY/MM/DD';

    return (
      <Form onSubmit={this.changeListParams} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="日期">
              {getFieldDecorator('refuelTime')(<DatePicker format={dateFormat} />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.resetListParams}>
              重置
            </Button>
          </div>
        </div>
      </Form>
    );
  }

  render() {
    const {
      dispatch,
      getListIsLoading,
      infoList: {
        listParams: { page },
        list: { data: listData, totalItemCount },
      },
    } = this.props;
    const listProps = {
      columns: [
        {
          title: '序号',
          key: '#',
          width: 60,
          fixed: 'left',
          render: (text, record, index) => <Fragment>{(page - 1) * 10 + index + 1}</Fragment>,
        },
        {
          title: '会员名',
          key: 'member',
          width: 100,
          fixed: 'left',
          render: (text, record) => {
            return <Fragment>{record.b}</Fragment>;
          },
        },
        {
          title: '车牌号',
          key: 'carNum',
          width: 120,
          render: (text, record) => <Fragment>{record.c}</Fragment>,
        },
        {
          title: '油品名称',
          key: 'fuelName',
          render: (text, record) => <Fragment>{record.d}</Fragment>,
        },
        {
          title: '零售价',
          key: 'retailPrice',
          width: 100,
          render: (text, record) => <Fragment>{record.e}</Fragment>,
        },
        {
          title: '惠龙价',
          key: 'hletPricw',
          width: 120,
          render: (text, record) => <Fragment>{record.f}</Fragment>,
        },
        {
          title: '加油量',
          key: 'fuelQuantity',
          width: 100,
          render: (text, record) => <Fragment>{record.g}</Fragment>,
        },
        {
          title: '加油金额',
          key: 'fuelPrice',
          render: (text, record) => <Fragment>{record.h}</Fragment>,
        },
        {
          title: '日期',
          key: 'date',
          render: (text, record) => <Fragment>{record.i}</Fragment>,
        },
      ],
      rowKey: 'id',
      scroll: { x: 'max-content' },
      dataSource: listData,
      loading: getListIsLoading,
      style: {
        marginTop: 24,
      },
      pagination: {
        total: totalItemCount,
        current: page,
      },
      onChange: pagination => {
        dispatch({
          type: 'infoList/changeListParams',
          payload: {
            page: pagination.current,
          },
        });
      },
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
