import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GasForm from './components/GasForm';

@connect(({ loading }) => ({
  getListIsLoading: loading.effects['gasList/getList'],
}))
class Page extends PureComponent {
  render() {
    return (
      <PageHeaderWrapper>
        <GasForm />
      </PageHeaderWrapper>
    );
  }
}

export default Page;
