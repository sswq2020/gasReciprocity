import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Modal } from 'antd';

@connect(({ priceHistoryList }) => ({
  priceHistoryList,
}))
class CustomizeComponent extends PureComponent {
  render() {
    const {
      dispatch,
      priceHistoryList: { id, visible },
    } = this.props;
    return (
      <Modal
        title="hello"
        visible={visible}
        onOk={() => {
          dispatch({
            type: 'priceHistoryList/closePopup',
          });
        }}
        onClose={() => {
          dispatch({
            type: 'priceHistoryList/closePopup',
          });
        }}
      >
        {id}
      </Modal>
    );
  }
}
export default CustomizeComponent;
