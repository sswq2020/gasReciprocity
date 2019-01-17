import React, { PureComponent } from 'react';
import { Icon, Modal } from 'antd';
import styles from './styles.less';

class CustomizeComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      showPreview: false,
    };
  }

  render() {
    const backgroundSizeEnumerate = ['cover', 'contain'];
    const { url, previewUrl, backgroundSize, hasDelete = false, hasPreview = true } = this.props;
    const { showPreview } = this.state;
    let bs = backgroundSizeEnumerate[0];

    if (backgroundSizeEnumerate.indexOf(backgroundSize) !== -1) {
      bs = backgroundSize;
    }

    backgroundSizeEnumerate.indexOf(backgroundSize);
    return (
      <div className={styles.imgBox}>
        <div
          className={styles.img}
          style={{ backgroundImage: `url(${url})`, backgroundSize: bs }}
        />
        <div className={styles.marker} />
        {(hasDelete || hasPreview) && (
          <div className={styles.tools}>
            {hasPreview && (
              <Icon
                onClick={() => {
                  this.setState({
                    showPreview: true,
                  });
                }}
                title="预览图片"
                type="eye"
              />
            )}
            {hasDelete && <Icon title="删除文件" type="delete" />}
          </div>
        )}
        {hasPreview && (
          <Modal
            visible={showPreview}
            footer={null}
            width={600}
            onCancel={() => {
              this.setState({
                showPreview: false,
              });
            }}
          >
            <div
              style={{
                background: `url('${previewUrl || url}') no-repeat center`,
                width: 550,
                height: 550,
                marginTop: 36,
              }}
            />
          </Modal>
        )}
      </div>
    );
  }
}
export default CustomizeComponent;
