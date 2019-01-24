import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';
import TableList from '@/components/TableList';

@connect(({ priceHistoryList }) => ({
  priceHistoryList,
}))
class CustomizeComponent extends PureComponent {
  render() {
    const {
      dispatch,
      priceHistoryList: {
        visible,
        listParams: { currentPage },
        list: { list: listData, itemCount: totalItemCount },
      },
    } = this.props;

    const listProps = {
      columns: [
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
          render: (text, record) => <Fragment>￥{parseFloat(record.b).toFixed(2)}</Fragment>,
        },
        {
          title: '会员折扣(%)',
          key: 'memberDiscount',
          width: 100,
          render: (text, record) => <Fragment>{record.c}%</Fragment>,
        },
        {
          title: '会员价',
          key: 'memberPrice',
          width: 100,
          render: (text, record) => <Fragment>￥{parseFloat(record.d).toFixed(2)}</Fragment>,
        },
        {
          title: '生效时间',
          key: 'effectTime',
          width: 120,
          render: (text, record) => <Fragment>￥{record.f}</Fragment>,
        },
        {
          title: '调价申请时间',
          key: 'HisTime',
          width: 120,
          render: (text, record) => <Fragment>￥{record.f}</Fragment>,
        },
      ],
      rowKey: 'id',
      scroll: { x: 'max-content' },
      dataSource: listData,
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
            pagcurrentPagee: pagination.current,
          },
        });
      },
    };

    return (
      <Modal
        width={1000}
        title="调价历史"
        visible={visible}
        onOk={() => {
          dispatch({
            type: 'priceHistoryList/closePopup',
          });
        }}
        onCancel={() => {
          dispatch({
            type: 'priceHistoryList/closePopup',
          });
        }}
      >
        <TableList {...listProps} />
      </Modal>
    );
  }
}
export default CustomizeComponent;
