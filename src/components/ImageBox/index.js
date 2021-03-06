import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import PreviewImage from '../PreviewImage';
import styles from './styles.less';

class CustomizeComponent extends PureComponent {
  constructor() {
    super();
    this.state = {
      previewImage: null,
    };
  }

  render() {
    const backgroundSizeEnumerate = ['cover', 'contain'];
    const { url, previewUrl, backgroundSize, hasPreview = true, onDelete = false } = this.props;
    const { previewImage } = this.state;
    let bs = backgroundSizeEnumerate[0];

    if (backgroundSizeEnumerate.indexOf(backgroundSize) !== -1) {
      bs = backgroundSize;
    }

    return (
      <div className={styles.imgBox} style={{ cursor: onDelete || hasPreview ? 'pointer' : '' }}>
        <div
          className={styles.img}
          style={{ backgroundImage: `url(${url})`, backgroundSize: bs }}
        />
        {(onDelete || hasPreview) && <div className={styles.marker} />}
        {(onDelete || hasPreview) && (
          <div className={styles.tools}>
            {hasPreview && (
              <Icon
                onClick={() => {
                  previewImage.open(previewUrl || url);
                }}
                title="预览图片"
                type="eye"
              />
            )}
            {onDelete && (
              <Icon
                title="删除文件"
                type="delete"
                onClick={() => {
                  if (typeof onDelete === 'function') {
                    onDelete();
                  }
                }}
              />
            )}
          </div>
        )}
        {hasPreview && (
          <PreviewImage
            ref={ref => {
              this.setState({
                previewImage: ref,
              });
            }}
          />
          // <Modal
          //   visible={showPreview}
          //   footer={null}
          //   width={600}
          //   onCancel={() => {
          //     this.setState({
          //       showPreview: false,
          //     });
          //   }}
          // >
          //   <div
          //     style={{
          //       background: `url('${previewUrl || url}') no-repeat center`,
          //       backgroundSize: 'contain',
          //       width: 552,
          //       height: 552,
          //       marginTop: 36,
          //     }}
          //   />
          // </Modal>
        )}
      </div>
    );
  }
}
export default CustomizeComponent;
