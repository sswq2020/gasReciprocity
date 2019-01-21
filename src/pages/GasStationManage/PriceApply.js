import React, { PureComponent, Fragment } from 'react';
// import moment from 'moment';
import { connect } from 'dva';
// import router from 'umi/router';
// import Link from 'umi/link';
import { Row, Col, Form, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import HLModal from '@/components/Modal';
import ListHeaderForm from '@/components/ListHeaderForm';
import Select from '@/components/Select';
import PriceApplyForm from './components/PriceApplyForm';

const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

@connect(({ priceApply, loading }) => ({
  priceApply,
  getListIsLoading: loading.effects['priceApply/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'priceApply/resetListParams' });
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
        type: 'priceApply/changeListParams',
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
      type: 'priceApply/resetListParams',
    });
  };

  renderAdvancedForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.changeListParams} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col {...formItemWidth}>
            <FormItem label="油品名称">
              {getFieldDecorator('fuelName', {
                initialValue: null,
              })(<Select hasAll placeholder="请选择" style={{ width: '100%' }} data={[]} />)}
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
  };

  openFormEdit = data => {
    const { dispatch } = this.props;
    const { id, ...formData } = data;
    dispatch({
      type: 'priceApply/openForm',
      payload: {
        id,
        formData,
      },
    });
  };

  render() {
    const {
      dispatch,
      getListIsLoading,
      priceApply: {
        visible,
        formData,
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
          title: '油品名称',
          key: 'fuelName',
          width: 100,
          render: (text, record) => <Fragment>{record.fuelName}</Fragment>,
        },
        {
          title: '零售价',
          key: 'retailPrice',
          width: 100,
          render: (text, record) => <Fragment>{record.b}</Fragment>,
        },
        {
          title: '会员折扣(%)',
          key: 'memberDiscount',
          width: 120,
          render: (text, record) => <Fragment>{record.c}</Fragment>,
        },
        {
          title: '会员价',
          key: 'memberPrice',
          width: 100,
          render: (text, record) => <Fragment>{record.d}</Fragment>,
        },
        {
          title: '加油金额',
          key: 'fuelPrice',
          width: 100,
          render: (text, record) => <Fragment>{record.e}</Fragment>,
        },
        {
          title: <div style={{ textAlign: 'center' }}>操作</div>,
          key: 'operating',
          render: (text, record) => {
            return (
              <div style={{ textAlign: 'center' }}>
                <a
                  onClick={() => {
                    this.openFormEdit(record);
                  }}
                  style={{ marginRight: 5 }}
                >
                  调价申请
                </a>
                <a>调价历史</a>
              </div>
            );
          },
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
          type: 'priceApply/changeListParams',
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
          <HLModal
            title="调价申请"
            visible={visible}
            onClose={() => {
              dispatch({
                type: 'priceApply/closeForm',
              });
            }}
            onOk={() => {
              dispatch({
                type: 'priceApply/submit',
              });
            }}
          >
            <PriceApplyForm data={formData} />
          </HLModal>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
