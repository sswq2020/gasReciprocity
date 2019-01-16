import React, { PureComponent } from 'react';
import { Card } from 'antd';
import styles from './DemoPage.less'

class Page extends PureComponent {
  render() {
    return (
      <Card className={styles.red}>hello world</Card>
    );
  }
}

export default Page;
