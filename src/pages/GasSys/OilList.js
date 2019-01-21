import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Form, Button, Modal } from 'antd';
import dict from '@/utils/dict';
import HLModal from '@/components/Modal';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import OilForm from './components/OilForm';

const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};

@connect(({ oilList, loading }) => ({
  oilList,
  getListIsLoading: loading.effects['oilList/getList'],
  createIsLoading: loading.effects['oilList/create'],
  editIsLoading: loading.effects['oilList/edit'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'oilList/resetListParams' });
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
        type: 'oilList/changeListParams',
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
      type: 'oilList/resetListParams',
    });
  };

  openFormEdit = data => {
    const { dispatch } = this.props;
    const { id, ...formData } = data;

    dispatch({
      type: 'oilList/openForm',
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
            <FormItem label="油品分类名称">
              {getFieldDecorator('oilModelName')(<Input placeholder="请输入" autoComplete="off" />)}
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
      oilList: {
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
          align: 'center',
          width: 60,
          render: (text, record, index) => (
            <Fragment>{(currentPage - 1) * 10 + index + 1}</Fragment>
          ),
        },
        {
          title: '油品分类名称',
          key: 'oilModelName',
          // align: 'center',
          width: 200,
          render: (text, record) => <Fragment>{record.oilModelName}</Fragment>,
        },
        {
          title: '油品分类描述',
          key: 'oilModelDesc',
          // align: 'center',
          render: (text, record) => <Fragment>{record.oilModelDesc}</Fragment>,
        },
        {
          title: '是否默认',
          key: 'isDefault',
          align: 'center',
          width: 110,
          render: (text, record) => (
            <span className={record.isDefault === dict.oilModelIsDefault && 'success_text'}>
              {dict.oilModelDefault[record.isDefault]}
            </span>
          ),
        },
        // {
        //   title: '状态',
        //   key: 'deleted',
        //   align: 'center',
        //   width: 110,
        //   render: (text, record) => {
        //     let flatClass = '';
        //     switch (record.deleted) {
        //       case dict.oilModelIsDeleted:
        //         flatClass = 'error_flat';
        //         break;
        //       case dict.oilModelIsNotDeleted:
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
        //         {dict.oilModelDeleted[record.deleted]}
        //       </Fragment>
        //     );
        //   },
        // },
        {
          title: '操作',
          key: 'operating',
          align: 'center',
          width: 200,
          render: (text, record) => {
            // const showText =
            //   dict.oilModelDeleted[
            //   record.deleted === dict.oilModelIsDeleted
            //     ? dict.oilModelIsNotDeleted
            //     : dict.oilModelIsDeleted
            //   ];
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
                      title: `你确定 删除 ${record.oilModelName}？`,
                      okText: '确认',
                      cancelText: '取消',
                      onOk: () => {
                        dispatch({
                          type: 'oilList/deleted',
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
                    record.deleted === dict.oilModelIsDeleted ? 'success_text' : 'error_text'
                  } cursor_pointer`}
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    Modal.confirm({
                      autoFocusButton: null,
                      title: `你确定 ${showText} ${record.oilModelName}？`,
                      okText: '确认',
                      cancelText: '取消',
                      onOk: () => {
                        dispatch({
                          type: record.j === '禁用' ? 'oilList/enable' : 'oilList/disable',
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
                {record.isDefault === dict.oilModelIsNotDefault && (
                  <a
                    style={{ margin: '0 5px' }}
                    onClick={() => {
                      Modal.confirm({
                        autoFocusButton: null,
                        title: `你确定把 ${record.oilModelName} 设为默认展示？`,
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {
                          dispatch({
                            type: 'oilList/setDefault',
                            payload: {
                              id: record.id,
                            },
                          });
                        },
                      });
                    }}
                  >
                    设为默认展示
                  </a>
                )}
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
          type: 'oilList/changeListParams',
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
                type: 'oilList/openForm',
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
          title={`${isEdit === false ? '新建' : '编辑'}油品分类`}
          visible={visible}
          confirmLoading={isEdit === false ? createIsLoading : editIsLoading}
          onOk={(data, resetFields) => {
            dispatch({
              type: isEdit === false ? 'oilList/create' : 'oilList/edit',
              payload: {
                data: { ...data.oil },
                resetFields,
              },
            });
          }}
          onClose={() => {
            dispatch({
              type: 'oilList/closeForm',
            });
          }}
        >
          <OilForm data={formData} />
        </HLModal>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
