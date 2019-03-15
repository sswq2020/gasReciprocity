import React, { PureComponent, Fragment } from 'react';
import { DatePicker } from 'antd';
import styles from './styles.less';

class CustomizeComponent extends PureComponent {
  state = {
    endOpen: false,
  };

  disabledStartDate = startValue => {
    const { endValue = null } = this.props;

    if (!startValue || !endValue) {
      return false;
    }
    return startValue.valueOf() > endValue.valueOf();
  };

  disabledEndDate = endValue => {
    const { startValue = null } = this.props;
    if (!endValue || !startValue) {
      return false;
    }
    return endValue.valueOf() <= startValue.valueOf();
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  render() {
    const { endOpen } = this.state;
    const { startValue, endValue, onStartChange = () => {}, onEndChange = () => {} } = this.props;

    return (
      <Fragment>
        <div className={styles.datepicker}>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={startValue}
            placeholder="开始日期"
            onChange={value => {
              return onStartChange(value);
            }}
            onOpenChange={this.handleStartOpenChange}
            disabledDate={this.disabledStartDate}
          />
        </div>
        <div className={styles.datepicker} style={{ marginRight: 0 }}>
          <DatePicker
            showTime
            format="YYYY-MM-DD HH:mm:ss"
            value={endValue}
            placeholder="结束日期"
            onChange={value => {
              return onEndChange(value);
            }}
            open={endOpen}
            onOpenChange={this.handleEndOpenChange}
            disabledDate={this.disabledEndDate}
          />
        </div>
      </Fragment>
    );
  }
}

export default CustomizeComponent;
