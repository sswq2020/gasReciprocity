import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Form, Button, Modal } from 'antd';
import HLModal from '@/components/Modal';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import ServiceForm from './components/ServiceForm';

const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

@connect(({ serviceList, loading }) => ({
  serviceList,
  getListIsLoading: loading.effects['serviceList/getList'],
  createIsLoading: loading.effects['oilList/create'],
  editIsLoading: loading.effects['oilList/edit'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'serviceList/resetListParams' });
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
        type: 'serviceList/changeListParams',
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
      type: 'serviceList/resetListParams',
    });
  };

  openFormEdit = data => {
    const { dispatch } = this.props;
    const { id, fsIcon, ...formData } = data;

    dispatch({
      type: 'serviceList/openForm',
      payload: {
        isEdit: true,
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
      <Form onSubmit={this.changeListParams}>
        <Row gutter={{ md: 16, lg: 24, xl: 48 }}>
          <Col {...formItemWidth}>
            <FormItem label="特色服务名称">
              {getFieldDecorator('fsName')(<Input placeholder="请输入" autoComplete="off" />)}
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
      createIsLoading,
      editIsLoading,
      serviceList: {
        isEdit,
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
          title: '特色服务ICON',
          key: 'fsIcon',
          width: 150,
          align: 'center',
          render: (text, record) => {
            return (
              <img
                style={{ height: 48 }}
                src={record.fsIcon}
                alt={record.fsName}
                title={record.fsName}
              />
            );
          },
        },
        {
          title: '特色服务名称',
          key: 'fsName',
          render: (text, record) => <Fragment>{record.fsName}</Fragment>,
        },
        // {
        //   title: '状态',
        //   key: 'status',
        //   align: 'center',
        //   width: 110,
        //   render: (text, record) => {
        //     let flatClass = '';
        //     switch (record.j) {
        //       case '禁用':
        //         flatClass = 'error_flat';
        //         break;
        //       case '正常':
        //         flatClass = 'success_flat';
        //         break;
        //       default:
        //         break;
        //     }
        //     return (
        //       <Fragment>
        //         <i
        //           style={{
        //             verticalAlign: 1,
        //             marginRight: 5,
        //           }}
        //           className={`point ${flatClass}`}
        //         />
        //         {record.j}
        //       </Fragment>
        //     );
        //   },
        // },
        {
          title: <div style={{ textAlign: 'center' }}>操作</div>,
          key: 'operating',
          width: 150,
          align: 'center',
          render: (text, record) => {
            // const showText = record.j === '禁用' ? '激活' : '禁用';
            return (
              <Fragment>
                <a
                  style={{ margin: '0 5px' }}
                  onClick={() => {
                    this.openFormEdit(record);
                  }}
                >
                  编辑
                </a>
                <span
                  className="error_text cursor_pointer"
                  style={{ margin: '0 5px' }}
                  onClick={() => {
                    Modal.confirm({
                      autoFocusButton: null,
                      title: `你确定 删除 ${record.fsName}？`,
                      okText: '确认',
                      cancelText: '取消',
                      onOk: () => {
                        dispatch({
                          type: 'serviceList/deleted',
                          payload: {
                            id: record.id,
                          },
                        });
                      },
                    });
                  }}
                >
                  删除
                </span>
                {/* <span
                  className={`${
                    record.j === '禁用' ? 'success_text' : 'error_text'
                  } cursor_pointer`}
                  onClick={() => {
                    Modal.confirm({
                      autoFocusButton: null,
                      title: `你确定 ${showText} ${record.c}？`,
                      okText: '确认',
                      cancelText: '取消',
                      onOk: () => {
                        dispatch({
                          type: record.j === '禁用' ? 'serviceList/enable' : 'serviceList/disable',
                          payload: {
                            id: record.id,
                          },
                        });
                      },
                    });
                  }}
                >
                  {showText}
                </span> */}
              </Fragment>
            );
          },
        },
      ],
      // scroll: { x: 'max-content' },
      dataSource: listData,
      loading: getListIsLoading,
      pagination: {
        total: totalItemCount,
        current: currentPage,
      },
      onChange: pagination => {
        dispatch({
          type: 'serviceList/changeListParams',
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
              dispatch({
                type: 'serviceList/openForm',
                payload: {
                  isEdit: false,
                  id: null,
                },
              });
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
        <HLModal
          destroyOnClose
          title={`${isEdit ? '编辑' : '新建'}特殊服务`}
          visible={visible}
          confirmLoading={isEdit === false ? createIsLoading : editIsLoading}
          onOk={data => {
            dispatch({
              type: isEdit === false ? 'serviceList/create' : 'serviceList/edit',
              payload: {
                data: { ...data.service },
              },
            });
          }}
          onClose={() => {
            dispatch({
              type: 'serviceList/closeForm',
            });
          }}
        >
          <ServiceForm data={formData} />
        </HLModal>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
