import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Row, Col, Input, Form, Button, Card } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import Select from '@/components/Select';

const FormItem = Form.Item;

@connect(({ gasList, loading }) => ({
  gasList,
  getListIsLoading: loading.effects['gasList/getList'],
}))
@Form.create()
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'gasList/resetListParams' });
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
        type: 'gasList/changeListParams',
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
      type: 'gasList/resetListParams',
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    return (
      <Form onSubmit={this.changeListParams} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="会员名">
              {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="加油站名称">
              {getFieldDecorator('appId')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="加油站状态">
              {getFieldDecorator('auditorId', {
                initialValue: null,
              })(<Select hasAll placeholder="请选择" style={{ width: '100%' }} data={[]} />)}
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
  }

  render() {
    const {
      dispatch,
      getListIsLoading,
      gasList: {
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
          title: '会员名',
          key: 'b',
          width: 100,
          fixed: 'left',
          render: (text, record) => {
            return <Fragment>{record.b}</Fragment>;
          },
        },
        {
          title: '加油站编号',
          key: 'no',
          width: 120,
          render: (text, record) => <Fragment>{record.c}</Fragment>,
        },
        {
          title: '加油站名称',
          key: 'name',
          render: (text, record) => <Fragment>{record.d}</Fragment>,
        },
        {
          title: '加油站电话',
          key: 'tel',
          width: 100,
          render: (text, record) => <Fragment>{record.e}</Fragment>,
        },
        {
          title: '加油站联系人',
          key: 'contact',
          width: 120,
          render: (text, record) => <Fragment>{record.f}</Fragment>,
        },
        {
          title: '联系人手机',
          key: 'contactPhone',
          width: 100,
          render: (text, record) => <Fragment>{record.g}</Fragment>,
        },
        {
          title: '联系邮箱',
          key: 'contactEmail',
          render: (text, record) => <Fragment>{record.h}</Fragment>,
        },
        {
          title: '加油站地址',
          key: 'add',
          render: (text, record) => <Fragment>{record.i}</Fragment>,
        },
        {
          title: '加油站状态',
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
          title: '收款二维码',
          key: 'qCode',
          render: () => <a>点击查看</a>,
        },
        {
          title: <div style={{ textAlign: 'center' }}>操作</div>,
          key: 'operating',
          width: 200,
          fixed: 'right',
          render: (text, record) => (
            <div style={{ textAlign: 'center' }}>
              <Link style={{ marginRight: 10 }} to={`/gas/edit/${record.id}`}>
                编辑
              </Link>
              <Link style={{ marginRight: 10 }} to={`/gas/edit/${record.id}`}>
                {record.j === '禁用' ? '激活' : '禁用'}
              </Link>
              <Link to={`/gas/edit/${record.id}`}>下载二维码</Link>
            </div>
          ),
        },
      ],
      rowKey: 'a',
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
          type: 'gasList/changeListParams',
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
              router.push('/gasSys/gasCreate');
            }}
            type="primary"
            icon="plus"
          >
            新建
          </Button>
        }
      >
        <Card bordered={false} bodyStyle={{ padding: '0 0 20px 0' }}>
          <ListHeaderForm>{this.renderAdvancedForm()}</ListHeaderForm>
          <TableList {...listProps} />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Page;
