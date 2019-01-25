import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Row, Col, Input, Form, Button, Modal, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import PreviewImage from '@/components/PreviewImage';

const { MonthPicker } = DatePicker;
const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};
let previewImage = null;

@connect(({ invoiceConfirm, loading }) => ({
  invoiceConfirm,
  invoiceConfirmIsLoading: loading.effects['invoiceConfirm/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'invoiceConfirm/resetListParams' });
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
        type: 'invoiceConfirm/changeListParams',
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
      type: 'invoiceConfirm/resetListParams',
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
            <FormItem label="年月">
              {getFieldDecorator('year')(<MonthPicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem label="加油站名称">
              {getFieldDecorator('gasStation')(<Input placeholder="请输入" autoComplete="off" />)}
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
      invoiceConfirmIsLoading,
      invoiceConfirm: {
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
          align: 'center',
          render: (text, record, index) => (
            <Fragment>{(currentPage - 1) * 10 + index + 1}</Fragment>
          ),
        },
        {
          title: '加油站名称',
          key: 'name',
          width: 200,
          align: 'center',
          render: (text, record) => <Fragment>{record.b}</Fragment>,
        },
        {
          title: '年月',
          key: 'date',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.a}</Fragment>,
        },
        {
          title: '发票号码',
          key: 'invoiceNum',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.c}</Fragment>,
        },
        {
          title: '开票方名称',
          key: 'invoiceName',
          width: 200,
          align: 'center',
          render: (text, record) => <Fragment>{record.d}</Fragment>,
        },
        {
          title: '发票类型',
          key: 'invoiceType',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.e}</Fragment>,
        },
        {
          title: '应开金额',
          key: 'finace',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.f}</Fragment>,
        },
        {
          title: '实开金额',
          key: 'finace2',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.g}</Fragment>,
        },
        {
          title: '发票照片',
          key: 'invoicePhoto',
          align: 'center',
          width: 110,
          render: () => (
            <a
              onClick={() => {
                previewImage.open('//lorempixel.com/450/250/');
              }}
            >
              查看
            </a>
          ),
        },
        {
          title: '发票状态',
          key: 'status',
          align: 'center',
          width: 110,
          render: (text, record) => {
            let flatClass = '';
            switch (record.j) {
              case '作废':
                flatClass = 'error_flat';
                break;
              case '正常':
                flatClass = 'success_flat';
                break;
              default:
                break;
            }
            return (
              <Fragment>
                <i
                  style={{
                    verticalAlign: 1,
                    marginRight: 5,
                  }}
                  className={`point ${flatClass}`}
                />
                {record.j}
              </Fragment>
            );
          },
        },
        {
          title: <div style={{ textAlign: 'center' }}>操作</div>,
          key: 'operating',
          align: 'center',
          fixed: 'right',
          width: 100,
          render: (text, record) => {
            if (record.j === '正常') {
              return (
                <div style={{ textAlign: 'center' }}>
                  <span
                    className="success_text cursor_pointer"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      Modal.confirm({
                        autoFocusButton: null,
                        title: '你确定作废该发票？',
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {},
                      });
                    }}
                  >
                    作废
                  </span>
                </div>
              );
            }
          },
        },
      ],
      rowKey: 'id',
      scroll: { x: 'max-content' },
      dataSource: listData,
      loading: invoiceConfirmIsLoading,
      pagination: {
        total: totalItemCount,
        current: currentPage,
      },
      onChange: pagination => {
        dispatch({
          type: 'invoiceConfirm/changeListParams',
          payload: {
            pagcurrentPagee: pagination.current,
          },
        });
      },
    };
    return (
      <PageHeaderWrapper
        tools={
          <Button
            onClick={() => {
              router.push('/financeSys/invoiceConfirm/create');
            }}
            type="primary"
            icon="plus"
          >
            新建
          </Button>
        }
      >
        <ListHeaderForm>{this.renderAdvancedForm()}</ListHeaderForm>
        <TableList {...listProps} />
        <PreviewImage
          ref={ref => {
            previewImage = ref;
          }}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Page;
