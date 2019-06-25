import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, Card, DatePicker, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import GasStationPop from '@/components/GasStationPop/index';

const SearCh = Input.Search;
const { MonthPicker } = DatePicker;
const FormItem = Form.Item;
const formItemWidth = {
  lg: 6,
  md: 12,
  sm: 24,
};

@connect(({ getDetailes, loading }) => ({
  getDetailes,
  getListIsLoading: loading.effects['getDetailes/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'getDetailes/resetListParams' });
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
        type: 'getDetailes/changeListParams',
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
      type: 'getDetailes/overrideStateProps',
      payload: {
        gas: { gsName: null },
      },
    });
    dispatch({
      type: 'getDetailes/resetListParams',
    });
  };

  openPop = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'gasStationPop/openPopup',
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
      getDetailes: {
        listParams: { queryYears, userPlate },
        gas,
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
              })(<MonthPicker autoComplete="off" style={{ width: '100%' }} format={dateFormat} />)}
            </FormItem>
          </Col>
          <Col {...{ lg: 7, md: 12, sm: 24, }}>
            <FormItem label="加油站名称">
              {getFieldDecorator('gsId')(<Input type="hidden" />)}
              <SearCh
                enterButton
                value={gas.gsName}
                readOnly
                onSearch={this.openPop}
                placeholder="请点击"
                autoComplete="off"
                style={{ width: '100%' }}
              />
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem label="车牌号">
              {getFieldDecorator('userPlate', {
                initialValue: userPlate,
              })(<Input placeholder="请选择" style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col {...{ lg: 5, md: 12, sm: 24, }}>
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
      form: { setFieldsValue },
      getDetailes: {
        listParams: { currentPage },
        list: {
          orderDtoList: listData,
          itemCount: totalItemCount,
          oilSubTotal,
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
          width: 60,
          align: 'center',
          render: (text, record, index) => (
            <Fragment>{(currentPage - 1) * 10 + index + 1}</Fragment>
          ),
        },
        {
          title: '车牌号',
          key: 'userPlate',
          align: 'center',
          width: 120,
          render: (text, record) => <Fragment>{record.userPlate}</Fragment>,
        },
        {
          title: '加油站名称',
          key: 'gsName',
          align: 'center',
          width: 120,
          render: (text, record) => <Fragment>{record.gsName}</Fragment>,
        },
        {
          title: '油气名称',
          key: 'oilModelName',
          width: 200,
          align: 'center',
          render: (text, record) => <Fragment>{record.oilModelName}</Fragment>,
        },
        {
          title: '零售价',
          key: 'oilRetailPrice',
          width: 120,
          align: 'center',
          render: (text, record) => (
            <Fragment>
              {record.oilRetailPrice}
              元/{record.oilUnit}
            </Fragment>
          ),
        },
        {
          title: '会员价',
          key: 'oilMemberPrice',
          width: 120,
          align: 'center',
          render: (text, record) => (
            <Fragment>
              {record.oilMemberPrice}
              元/{record.oilUnit}
            </Fragment>
          ),
        },
        {
          title: '加注量',
          key: 'fuelVolume',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.fuelVolume}{record.oilUnit}</Fragment>,
        },
        {
          title: '加注金额',
          key: 'totalPrice',
          align: 'center',
          width: 100,
          render: (text, record) => <Fragment>{record.totalPrice}元</Fragment>,
        },
        {
          title: '日期',
          key: 'orderTime',
          width: 200,
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
          type: 'getDetailes/changeListParams',
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
              <span style={{ color: 'red', fontSize: '1.1rem' }}>{oilSubTotal}</span>
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
        <Card bordered={false} bodyStyle={{ padding: '0 0 20px 0' }}>
          <ListHeaderForm>{this.renderAdvancedForm()}</ListHeaderForm>
          <TableList {...listProps} />
        </Card>
        <GasStationPop
          onOk={data => {
            data = data || { id: null, gsName: null };
            dispatch({
              type: 'getDetailes/overrideStateProps',
              payload: {
                gas: data,
              },
            });
            setFieldsValue({
              gsId: data.id,
            });
          }}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Page;
