import React, { PureComponent } from 'react';

export default class CustomizeComponent extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <div
        style={{
          backgroundColor: '#F6F8FA',
          fontSize: 16,
          color: '#333333',
          padding: '10px 15px',
          marginBottom: 24,
        }}
      >
        {children}
      </div>
    );
  }
}
