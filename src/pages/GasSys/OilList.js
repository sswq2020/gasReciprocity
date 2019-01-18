import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Form, Button, Modal } from 'antd';
import HLModal from '@/components/Modal';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import OilForm from './components/OilForm';

const FormItem = Form.Item;

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
      <Form onSubmit={this.changeListParams} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="油品分类名称">
              {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ float: 'right' }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.resetListParams}>
              重置
            </Button>
          </div>
        </div>
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
          render: (text, record, index) => <Fragment>{(page - 1) * 10 + index + 1}</Fragment>,
        },
        {
          title: '油品分类名称',
          key: 'no',
          width: 150,
          render: (text, record) => <Fragment>{record.c}</Fragment>,
        },
        {
          title: '油品分类描述',
          key: 's',
          render: (text, record) => <Fragment>{record.k}</Fragment>,
        },
        {
          title: '是否默认',
          key: 'status',
          width: 110,
          render: (text, record) => {
            return <span className={record.l === '是' ? 'success_text' : ''}>{record.l}</span>;
          },
        },
        {
          title: '状态',
          key: 'status',
          width: 110,
          render: (text, record) => {
            let flatClass = '';
            switch (record.j) {
              case '禁用':
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
          width: 200,
          render: (text, record) => {
            const showText = record.j === '禁用' ? '激活' : '禁用';
            return (
              <div style={{ textAlign: 'center' }}>
                <a
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    this.openFormEdit(record);
                  }}
                >
                  编辑
                </a>
                <span
                  className={`${
                    record.j === '禁用' ? 'success_text' : 'error_text'
                  } cursor_pointer`}
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    Modal.confirm({
                      autoFocusButton: null,
                      title: `你确定 ${showText} ${record.c}？`,
                      okText: '确认',
                      cancelText: '取消',
                      onOk: () => {},
                    });
                  }}
                >
                  {showText}
                </span>
                {record.l === '否' && (
                  <a
                    onClick={() => {
                      Modal.confirm({
                        autoFocusButton: null,
                        title: `你确定把 ${record.c} 设为默认展示？`,
                        okText: '确认',
                        cancelText: '取消',
                        onOk: () => {},
                      });
                    }}
                  >
                    设为默认展示
                  </a>
                )}
              </div>
            );
          },
        },
      ],
      // scroll: { x: 'max-content' },
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
          type: 'oilList/changeListParams',
          payload: {
            page: pagination.current,
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
