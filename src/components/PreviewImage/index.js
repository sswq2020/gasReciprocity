import React, { PureComponent } from 'react';
import { Modal } from 'antd';

class CustomizeComponent extends PureComponent {
  constructor() {
    super();
    // const { visible = false } = this.props;
    this.state = {
      showPreview: false,
      url: '',
    };
  }

  open = url => {
    this.setState({
      showPreview: true,
      url,
    });
  };

  render() {
    const { imageSize = 550 } = this.props;
    const { showPreview, url = '' } = this.state;
    return (
      <Modal
        visible={showPreview}
        footer={null}
        width={imageSize + 50 + 2}
        onCancel={() => {
          this.setState({
            showPreview: false,
            url: '',
          });
        }}
      >
        <div
          style={{
            background: `url('${url}') no-repeat center`,
            backgroundSize: 'contain',
            width: imageSize + 2,
            height: imageSize + 2,
            marginTop: 36,
          }}
        />
      </Modal>
    );
  }
}
export default CustomizeComponent;
