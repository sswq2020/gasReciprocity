import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { imgHost } from '@/services/mock';
import { Row, Col, Input, Form, Button, Modal, DatePicker } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import PreviewImage from '@/components/PreviewImage';
import dict from '@/utils/dict';
import moment from 'moment';

const imgUrl = `${imgHost[ENV]}/action/hletong/file/gasDownload?file_id=`;
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
              {getFieldDecorator('createTime')(<MonthPicker style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem label="加油站名称">
              {getFieldDecorator('gsName')(<Input placeholder="请输入" autoComplete="off" />)}
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
          key: 'gsName',
          align: 'center',
          render: (text, record) => <Fragment>{record.gsName}</Fragment>,
        },
        {
          title: '年月',
          key: 'createTime',
          width: 200,
          align: 'center',
          render: (text, record) => (
            <Fragment>{moment(record.createTime).format('YYYY/MM/DD hh:mm:ss')}</Fragment>
          ),
        },
        {
          title: '发票号码',
          key: 'billCode',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.billCode}</Fragment>,
        },
        {
          title: '开票方名称',
          key: 'billName',
          width: 200,
          align: 'center',
          render: (text, record) => <Fragment>{record.billName}</Fragment>,
        },
        {
          title: '发票类型',
          key: 'billType',
          width: 150,
          align: 'center',
          render: (text, record) => <Fragment>{dict.hhgsBillType[record.billType]}</Fragment>,
        },
        {
          title: '应开金额',
          key: 'billAmt',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.billAmt}</Fragment>,
        },
        {
          title: '实开金额',
          key: 'billActualAmt',
          width: 120,
          align: 'center',
          render: (text, record) => <Fragment>{record.billActualAmt}</Fragment>,
        },
        {
          title: '发票照片',
          key: 'invoicePhoto',
          align: 'center',
          width: 110,
          render: (text, record) =>
            record.billFileId && record.billFileId.length > 0 ? (
              <a
                onClick={() => {
                  previewImage.open(`${imgUrl}${record.billFileId[0]}`);
                }}
              >
                查看
              </a>
            ) : (
              <span>暂无</span>
            ),
        },
        {
          title: '发票状态',
          key: 'status',
          align: 'center',
          width: 110,
          render: (text, record) => {
            let flatClass = '';
            switch (record.status) {
              case dict.billIsDisannultStatus:
                flatClass = 'error_flat';
                break;
              case dict.billIsNormalStatus:
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
                {dict.billStatus[record.status]}
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
            if (dict.billIsNormalStatus === record.status) {
              return (
                <div style={{ textAlign: 'center' }}>
                  <span
                    className="error_text cursor_pointer"
                    style={{ marginRight: 10 }}
                    onClick={() => {
                      Modal.confirm({
                        autoFocusButton: null,
                        title: `你确定作废发票号码${record.billCode}吗？`,
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {
                          dispatch({
                            type: 'invoiceConfirm/disannul',
                            payload: {
                              id: record.id,
                            },
                          });
                        },
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
            currentPage: pagination.current,
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
