import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';

const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

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
          currentPage: 1,
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
          <Col {...formItemWidth}>
            <FormItem label="日期">
              {getFieldDecorator('refuelTime')(
                <DatePicker style={{ width: '100%' }} format={dateFormat} />
              )}
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
      dispatch,
      getListIsLoading,
      infoList: {
        listParams: { currentPage },
        list: { list: listData, itemCount: totalItemCount },
      },
    } = this.props;
    const listProps = {
      columns: [
        {
          title: '序号',
          key: '#',
          width: 60,
          fixed: 'left',
          render: (text, record, index) => (
            <Fragment>{(currentPage - 1) * 10 + index + 1}</Fragment>
          ),
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
      pagination: {
        total: totalItemCount,
        current: currentPage,
      },
      onChange: pagination => {
        dispatch({
          type: 'infoList/changeListParams',
          payload: {
            currentPage: pagination.current,
          },
        });
      },
    };
    return (
      <PageHeaderWrapper>
        <ListHeaderForm>{this.renderAdvancedForm()}</ListHeaderForm>
        <TableList {...listProps} />
      </PageHeaderWrapper>
    );
  }
}

export default Page;
