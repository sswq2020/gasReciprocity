import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Form, Button, Modal } from 'antd';
import dict from '@/utils/dict';
import TableList from '@/components/TableList';
import ListHeaderForm from '@/components/ListHeaderForm';

const FormItem = Form.Item;
const formItemWidth = {
  lg: 12,
  md: 12,
  sm: 24,
};
let gas = null;
@connect(({ gasStationPop, loading }) => ({
  gasStationPop,
  getListIsLoading: loading.effects['gasStationPop/getList'],
}))
@Form.create()
class CustomizeComponent extends PureComponent {
  changeListParams = e => {
    e.preventDefault();
    const {
      dispatch,
      form: { validateFields, getFieldsValue },
    } = this.props;

    validateFields(err => {
      if (err) return;
      dispatch({
        type: 'gasStationPop/changeListParams',
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
      type: 'gasStationPop/resetListParams',
    });
  };

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
      gasStationPop: { gsName },
    } = this.props;

    return (
      <Form onSubmit={this.changeListParams}>
        <Row gutter={{ md: 16, lg: 24, xl: 48 }}>
          <Col {...formItemWidth}>
            <FormItem label="加油站名称">
              {getFieldDecorator('gsName', { initialValue: gsName })(
                <Input placeholder="请输入" autoComplete="off" />
              )}
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
      onOk,
      gasStationPop: {
        visible,
        listParams: { currentPage },
        list: { list: listData, itemCount: totalItemCount },
      },
    } = this.props;
    const listProps = {
      columns: [
        {
          title: '编号',
          key: 'gsCode',
          width: 100,
          align: 'center',
          render: (text, record) => <Fragment>{record.gsCode}</Fragment>,
        },
        {
          title: '名称',
          key: 'gsName',
          width: 100,
          align: 'center',
          render: (text, record) => <Fragment>{record.gsName}</Fragment>,
        },
        {
          title: '电话',
          key: 'gsPhone',
          width: 100,
          align: 'center',
          render: (text, record) => <Fragment>{record.gsPhone}</Fragment>,
        },
        {
          title: '联系人',
          key: 'gsContact',
          width: 100,
          align: 'center',
          render: (text, record) => <Fragment>{record.gsContact}</Fragment>,
        },
        {
          title: '地址',
          key: 'gsDetailAddress',
          width: 300,
          align: 'center',
          render: (text, record) => (
            <Fragment>
              {record.gsProvinceName}
              {record.gsCityName}
              {record.gsRegionName}
              {record.gsDetailAddress}
            </Fragment>
          ),
        },
        {
          title: '状态',
          key: 'isBan',
          align: 'center',
          width: 100,
          render: (text, record) => {
            let flatClass = '';
            switch (record.isBan) {
              case '1':
                flatClass = 'error_flat';
                break;
              case '0':
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
                {dict.gasIsBaned[record.isBan]}
              </Fragment>
            );
          },
        },
      ],
      scroll: { x: 'max-content' },
      dataSource: listData,
      loading: getListIsLoading,
      pagination: {
        total: totalItemCount,
        current: currentPage,
      },
      onChange: pagination => {
        dispatch({
          type: 'gasStationPop/changeListParams',
          payload: {
            currentPage: pagination.current,
          },
        });
      },
      rowSelection: {
        type: 'radio',
        onSelect: record => {
          // const {id,gsName} = record;
          gas = record;
          // dispatch({
          //   type: 'gasStationPop/selectRow',
          //   payload:{id,gsName}
          // });
        },
      },
    };
    return (
      <Modal
        width={720}
        title="加油站列表"
        visible={visible}
        destroyOnClose
        onOk={() => {
          onOk(gas);
          dispatch({
            type: 'gasStationPop/closePopup',
          });
        }}
        onCancel={() => {
          dispatch({
            type: 'gasStationPop/closePopup',
          });
        }}
      >
        <ListHeaderForm>{this.renderAdvancedForm()}</ListHeaderForm>
        <TableList {...listProps} />
      </Modal>
    );
  }
}
export default CustomizeComponent;
