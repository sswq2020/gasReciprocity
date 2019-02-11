import React, { PureComponent } from 'react';
import Select from '@/components/Select';

class CustomizeComponent extends PureComponent {
  render() {
    const { before = 0, after = 0, ...props } = this.props;

    const startYear = new Date().getFullYear() - before;
    const yearList = [];
    for (let i = 0; i < before + after + 1; i++) {
      const year = startYear + i;
      yearList.push({
        itemCode: year,
        itemName: `${year}年`,
      });
    }

    return <Select {...props} data={yearList} />;
  }
}

export default CustomizeComponent;
