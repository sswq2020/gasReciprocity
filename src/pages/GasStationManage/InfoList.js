import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';

const { MonthPicker } = DatePicker;
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
      infoList: { queryYears },
    } = this.props;
    const dateFormat = 'YYYY-MM';

    return (
      <Form onSubmit={this.changeListParams} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...formItemWidth}>
            <FormItem label="日期">
              {getFieldDecorator('queryYears', {
                initialValue: queryYears,
              })(<MonthPicker style={{ width: '100%' }} format={dateFormat} />)}
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
        list: {
          orderDtoList: listData,
          itemCount: totalItemCount,
          subtotal,
          fuelVSubTotal,
          total,
          fuelVTotal,
        },
      },
    } = this.props;
    const listProps = {
      columns: [
        {
          title: '序号',
          key: '#',
          width: 60,
          fixed: 'left',
          align: 'center',
          render: (text, record, index) => (
            <Fragment>{(currentPage - 1) * 10 + index + 1}</Fragment>
          ),
        },
        {
          title: '会员名',
          key: 'userName',
          width: 200,
          fixed: 'left',
          align: 'center',
          render: (text, record) => {
            return <Fragment>{record.userName}</Fragment>;
          },
        },
        {
          title: '车牌号',
          key: 'userPlate',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.userPlate}</Fragment>,
        },
        {
          title: '油品名称',
          key: 'oilModelName',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.oilModelName}</Fragment>,
        },
        {
          title: '零售价',
          key: 'oilRetailPrice',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.oilRetailPrice}</Fragment>,
        },
        {
          title: '惠龙价',
          key: 'oilMemberPrice',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.oilMemberPrice}</Fragment>,
        },
        {
          title: '加油量',
          key: 'fuelVolume',
          width: 100,
          align: 'center',
          render: (text, record) => <Fragment>{record.fuelVolume}</Fragment>,
        },
        {
          title: '加油金额',
          key: 'totalPrice',
          width: 100,
          align: 'center',
          render: (text, record) => <Fragment>{record.totalPrice}</Fragment>,
        },
        {
          title: '日期',
          key: 'orderTime',
          width: 200,
          fixed: 'right',
          align: 'center',
          render: (text, record) => <Fragment>{record.orderTime}</Fragment>,
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
      title: () => {
        return (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              width: '80%',
              margin: '0 auto',
            }}
          >
            <div>
              当前页加油量小计
              <span style={{ color: 'red' }}>{subtotal}</span>L
            </div>
            <div>
              当前页加油金额小计￥
              <span style={{ color: 'red' }}>{total}</span>
            </div>
            <div>
              总页加油量合计
              <span style={{ color: 'red' }}>{fuelVSubTotal}</span>L
            </div>
            <div>
              总页加油金额合计￥
              <span style={{ color: 'red' }}>{fuelVTotal}</span>
            </div>
          </div>
        );
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
