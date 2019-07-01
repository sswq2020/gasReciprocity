import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Form, Button, Input } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import HLModal from '@/components/Modal';
import ListHeaderForm from '@/components/ListHeaderForm';
import PriceApplyForm from './components/PriceApplyForm';
import PriceHistoryList from './components/PriceHistoryList';

const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

@connect(({ priceApply, loading }) => ({
  priceApply,
  getListIsLoading: loading.effects['priceApply/getList'],
  applyPriceIsLoading: loading.effects['priceApply/applyPrice'],
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
      type: 'priceApply/resetListParams',
    });
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

  renderAdvancedForm = () => {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return (
      <Form onSubmit={this.changeListParams} layout="inline">
        <Row gutter={{ md: 16, lg: 24, xl: 48 }}>
          <Col {...formItemWidth}>
            <FormItem label="油气名称">
              {getFieldDecorator('oilModelName', {
                initialValue: null,
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
  };

  render() {
    const {
      dispatch,
      getListIsLoading,
      applyPriceIsLoading,
      priceApply: {
        visible,
        formData,
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
          align: 'center',
          render: (text, record, index) => (
            <Fragment>{(currentPage - 1) * 10 + index + 1}</Fragment>
          ),
        },
        {
          title: '油气名称',
          key: 'oilModelName',
          render: (text, record) => <Fragment>{record.oilModelName}</Fragment>,
        },
        {
          title: '零售价',
          key: 'oilRetailPrice',
          width: 150,
          align: 'center',
          render: (text, record) => <Fragment>{record.oilRetailPrice} L/元</Fragment>,
        },
        {
          title: '会员折扣(%)',
          key: 'memberDiscount',
          width: 150,
          align: 'center',
          render: (text, record) => <Fragment>{record.oilMemberAgio} %</Fragment>,
        },
        {
          title: '会员价',
          key: 'memberPrice',
          width: 150,
          align: 'center',
          render: (text, record) => <Fragment>{record.oilMemberPrice} L/元</Fragment>,
        },
        {
          title: '操作',
          key: 'operating',
          width: 200,
          align: 'center',
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
                <a
                  onClick={() => {
                    dispatch({
                      type: 'priceHistoryList/openPopup',
                      payload: record,
                    });
                  }}
                >
                  调价历史
                </a>
              </div>
            );
          },
        },
      ],
      rowKey: 'id',
      // scroll: { x: 'max-content' },
      dataSource: listData,
      loading: getListIsLoading,
      style: {
        marginTop: 24,
      },
      pagination: {
        total: totalItemCount,
        current: currentPage,
      },
      onChange: pagination => {
        dispatch({
          type: 'priceApply/changeListParams',
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
        <HLModal
          title="调价申请"
          visible={visible}
          destroyOnClose
          confirmLoading={applyPriceIsLoading}
          onClose={() => {
            dispatch({
              type: 'priceApply/closeForm',
            });
          }}
          onOk={(data, resetFields) => {
            dispatch({
              type: 'priceApply/applyPrice',
              payload: {
                data: { ...data },
                resetFields,
              },
            });
          }}
        >
          <PriceApplyForm data={formData} />
        </HLModal>
        <PriceHistoryList />
      </PageHeaderWrapper>
    );
  }
}

export default Page;
