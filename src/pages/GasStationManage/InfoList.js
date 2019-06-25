import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, DatePicker,Input } from 'antd';
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
      infoList: {
        listParams: { queryYears,userPlate },
      },
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
          <Col {...formItemWidth}>
            <FormItem label="车牌号">
              {getFieldDecorator('userPlate', {
                initialValue: userPlate,
              })(<Input placeholder="请选择" style={{ width: '100%' }} />)}
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
          oilSubtotal,
          fuelVSubTotal,
          oilTotal,
          fuelVTotal,
          gasSubtotal,
          gasFuelVSubTotal,
          gasTotal,
          gasFuelVTotal
        },
      },
    } = this.props;
    const listProps = {
      columns: [
        {
          title: '序号',
          key: '#',
          width: 120,
          align: 'center',
          render: (text, record, index) => (
            <Fragment>{(currentPage - 1) * 10 + index + 1}</Fragment>
          ),
        },
        {
          title: '车牌号',
          key: 'userPlate',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.userPlate}</Fragment>,
        },
        {
          title: '油气名称',
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
          render: (text, record) => <Fragment>{record.oilRetailPrice} 元/{record.oilUnit}</Fragment>,
        },
        {
          title: '会员价',
          key: 'oilMemberPrice',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.oilMemberPrice} 元/{record.oilUnit}</Fragment>,
        },
        {
          title: '加注量',
          key: 'fuelVolume',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.fuelVolume} {record.oilUnit}</Fragment>,
        },
        {
          title: '加注金额',
          key: 'totalPrice',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.totalPrice} 元</Fragment>,
        },
        {
          title: '日期',
          key: 'orderTime',
          width: 120,
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
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '80%',
                margin: '0 auto',
              }}
            >
              <div>
                单页加油量小计
              <span style={{ color: 'red', fontSize: '1.1rem' }}>{fuelVSubTotal}</span>L
            </div>
              <div>
                单页加油金额小计￥
              <span style={{ color: 'red', fontSize: '1.1rem' }}>{oilSubtotal}</span>
              </div>
              <div>
                总页加油量合计
              <span style={{ color: 'red', fontSize: '1.1rem' }}>{fuelVTotal}</span>L
            </div>
              <div>
                总页加油金额合计￥
              <span style={{ color: 'red', fontSize: '1.1rem' }}>{oilTotal}</span>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                width: '80%',
                margin: '0 auto',
              }}
            >
              <div>
                单页加气量小计
                      <span style={{ color: 'red', fontSize: '1rem' }}>{gasFuelVSubTotal}</span>kg
                    </div>
              <div>
                单页加气金额小计￥
                      <span style={{ color: 'red', fontSize: '1rem' }}>{gasSubtotal}</span>
              </div>
              <div>
                总页加气量总计
                      <span style={{ color: 'red', fontSize: '1rem' }}>{gasFuelVTotal}</span>kg
                    </div>
              <div>
                总页加气金额总计￥
                      <span style={{ color: 'red', fontSize: '1rem' }}>{gasTotal}</span>
              </div>
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
