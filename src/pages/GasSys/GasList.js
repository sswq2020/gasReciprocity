import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import Link from 'umi/link';
import { Row, Col, Input, Form, Button, Modal } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';
import PreviewImage from '@/components/PreviewImage';
import Select from '@/components/Select';

const FormItem = Form.Item;
const formItemWidth = {
  lg: 8,
  md: 12,
  sm: 24,
};
let previewImage = null;

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
      <Form onSubmit={this.changeListParams}>
        <Row gutter={{ md: 16, lg: 24, xl: 48 }}>
          <Col {...formItemWidth}>
            <FormItem label="会员名">
              {getFieldDecorator('text')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem label="加油站名称">
              {getFieldDecorator('appId')(<Input placeholder="请输入" autoComplete="off" />)}
            </FormItem>
          </Col>
          <Col {...formItemWidth}>
            <FormItem label="加油站状态">
              {getFieldDecorator('auditorId', {
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
          align: 'center',
          render: (text, record, index) => <Fragment>{(page - 1) * 10 + index + 1}</Fragment>,
        },
        {
          title: '会员名',
          key: 'b',
          width: 100,
          align: 'center',
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
          align: 'center',
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
          align: 'center',
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
          align: 'center',
          width: 110,
          render: () => (
            <a
              onClick={() => {
                previewImage.open('//lorempixel.com/450/250/');
              }}
            >
              点击查看
            </a>
          ),
        },
        {
          title: <div style={{ textAlign: 'center' }}>操作</div>,
          key: 'operating',
          width: 200,
          fixed: 'right',
          align: 'center',
          render: (text, record) => {
            const showText = record.j === '禁用' ? '激活' : '禁用';
            return (
              <Fragment>
                <Link style={{ marginRight: 10 }} to={`/gasSys/gas/edit/${record.id}`}>
                  编辑
                </Link>
                <span
                  className={`${
                    record.j === '禁用' ? 'success_text' : 'error_text'
                  } cursor_pointer`}
                  style={{ marginRight: 10 }}
                  onClick={() => {
                    Modal.confirm({
                      autoFocusButton: null,
                      title: `你确定 ${showText} 该加油站？`,
                      okText: '确认',
                      cancelText: '取消',
                      onOk: () => {},
                    });
                  }}
                >
                  {showText}
                </span>
                <a
                  onClick={() => {
                    window.open('//lorempixel.com/900/900/');
                  }}
                >
                  下载二维码
                </a>
              </Fragment>
            );
          },
        },
      ],
      scroll: { x: 'max-content' },
      dataSource: listData,
      loading: getListIsLoading,
      // style: {
      //   marginTop: 24,
      // },
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
              router.push('/gasSys/gas/create');
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
