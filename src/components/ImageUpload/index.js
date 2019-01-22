import React, { PureComponent, Fragment } from 'react';
import { Upload, Message, Progress } from 'antd';
import { hostList } from '@/services/mock';
import styles from './index.less';

function beforeUpload(file, maxSize) {
  const isLtMaxSize = file.size / 1024 / 1024 < maxSize;
  if (isLtMaxSize === false) {
    Message.warning(`图片请在${maxSize}MB以下！`);
  }
  return isLtMaxSize;
}

export default class CustomizeComponent extends PureComponent {
  state = {
    fileList: [],
    loading: false,
  };

  handleChange = info => {
    const { onSuccess = () => {} } = this.props;
    const { fileList } = this.state;
    this.setState({
      fileList: info.fileList,
      percent: 0,
    });
    switch (info.file.status) {
      case 'uploading':
        this.setState({
          loading: true,
          percent: parseInt(info.file.percent, 10),
        });
        break;
      case 'done':
        this.setState({ loading: false, percent: 0 });
        if (fileList[0].status !== 'done') {
          this.setState({
            fileList: [],
          });
        } else {
          onSuccess(info.file.response);
        }
        break;
      case 'error':
        this.setState({ loading: false, percent: 0 });
        Message.error('图片上传失败，请稍后重试！');
        break;
      default:
        break;
    }
  };

  render() {
    const { loading, fileList, percent } = this.state;
    const { maxSize = 8 } = this.props;
    return (
      <Fragment>
        <div className={`${styles.loadingCon} ${loading === true ? '' : styles.hidden}`}>
          <Progress
            width={62}
            style={{ marginTop: 20 }}
            type="circle"
            state="active"
            percent={percent}
          />
          <i
            className={styles.close}
            onClick={() => {
              this.setState({
                fileList: [
                  {
                    status: 'done',
                  },
                ],
                loading: false,
              });
            }}
          />
        </div>
        <Upload
          name="image"
          listType="picture-card"
          accept="image/*"
          showUploadList={false}
          className={`${styles.upload} ${loading === true ? styles.hidden : ''}`}
          headers={{
            'X-Auth-Token': window.localStorage.getItem('xAuthToken') || '',
          }}
          action={`//${hostList[ENV]}/action/hletong/file/gasUpload`}
          fileList={fileList}
          beforeUpload={file => {
            return beforeUpload(file, maxSize);
          }}
          onChange={this.handleChange}
        >
          {' '}
        </Upload>
      </Fragment>
    );
  }
}
