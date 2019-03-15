import React, { PureComponent, Fragment } from 'react';
import { TimePicker } from 'antd';
import moment from 'moment';
import styles from './styles.less';

class CustomizeComponent extends PureComponent {
  state = {
    endOpen: false,
  };

  handleStartOpenChange = open => {
    if (!open) {
      this.setState({ endOpen: true });
    }
  };

  handleEndOpenChange = open => {
    this.setState({ endOpen: open });
  };

  disabledStartHours = () => {
    const { endValue = null } = this.props;
    if (!endValue) {
      return;
    }
    const end = Number(moment(endValue).format('HH'));
    const hours = [];
    for (let i = end + 1; i <= 23; i++) {
      hours.push(i);
    }
    return hours;
  };

  disabledStartMinutes = selectedHour => {
    const { endValue = null } = this.props;
    if (!endValue) {
      return;
    }
    const endHours = Number(moment(endValue).format('HH'));
    const endMinutes = Number(moment(endValue).format('mm'));
    const Minutes = [];
    if (selectedHour === endHours) {
      for (let i = endMinutes + 1; i <= 59; i++) {
        Minutes.push(i);
      }
      return Minutes;
    }
  };

  disabledStartSeconds = (selectedHour, selectedMinute) => {
    const { endValue = null } = this.props;
    if (!endValue) {
      return;
    }
    const endHours = Number(moment(endValue).format('HH'));
    const endMinutes = Number(moment(endValue).format('mm'));
    const endSeconds = Number(moment(endValue).format('ss'));
    const Seconds = [];
    if (selectedHour === endHours && selectedMinute === endMinutes) {
      for (let i = endSeconds; i <= 59; i++) {
        Seconds.push(i);
      }
      return Seconds;
    }
  };

  disabledEndHours = () => {
    const { startValue = null } = this.props;
    if (!startValue) {
      return;
    }
    const start = Number(moment(startValue).format('HH'));
    const hours = [];
    for (let i = 0; i < start; i++) {
      hours.push(i);
    }
    return hours;
  };

  disabledEndMinutes = selectedHour => {
    const { startValue = null } = this.props;
    if (!startValue) {
      return;
    }
    const startHours = Number(moment(startValue).format('HH'));
    const startMinutes = Number(moment(startValue).format('mm'));
    const Minutes = [];
    if (selectedHour === startHours) {
      for (let i = 0; i < startMinutes; i++) {
        Minutes.push(i);
      }
      return Minutes;
    }
  };

  disabledEndSeconds = (selectedHour, selectedMinute) => {
    const { startValue = null } = this.props;
    if (!startValue) {
      return;
    }
    const startHours = Number(moment(startValue).format('HH'));
    const startMinutes = Number(moment(startValue).format('mm'));
    const startSeconds = Number(moment(startValue).format('ss'));
    const Seconds = [];
    if (selectedHour === startHours && selectedMinute === startMinutes) {
      for (let i = 0; i <= startSeconds; i++) {
        Seconds.push(i);
      }
      return Seconds;
    }
  };

  render() {
    const { endOpen } = this.state;
    const { startValue, endValue, onStartChange = () => {}, onEndChange = () => {} } = this.props;
    return (
      <Fragment>
        <div className={styles.timepicker}>
          <TimePicker
            value={startValue}
            placeholder="开始时间"
            allowClear={false}
            onChange={value => {
              return onStartChange(value);
            }}
            onOpenChange={this.handleStartOpenChange}
            disabledHours={this.disabledStartHours}
            disabledMinutes={this.disabledStartMinutes}
            disabledSeconds={this.disabledStartSeconds}
          />
        </div>
        <div className={styles.timepicker}>
          <TimePicker
            value={endValue}
            allowClear={false}
            placeholder="结束时间"
            open={endOpen}
            onChange={value => {
              return onEndChange(value);
            }}
            onOpenChange={this.handleEndOpenChange}
            disabledHours={this.disabledEndHours}
            disabledMinutes={this.disabledEndMinutes}
            disabledSeconds={this.disabledEndSeconds}
          />
        </div>
      </Fragment>
    );
  }
}

export default CustomizeComponent;
