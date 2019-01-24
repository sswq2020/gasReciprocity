import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GasForm from './components/GasForm';

@connect(({ loading, gasCreate }) => ({
  gasCreate,
  isLoading: loading.effects['gasCreate/create'],
}))
class Page extends PureComponent {
  render() {
    const {
      dispatch,
      gasCreate: { formData },
      isLoading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <GasForm
          loading={isLoading}
          data={formData}
          hasData
          onOk={data => {
            dispatch({
              type: 'gasCreate/create',
              payload: {
                data: data.gas,
              },
            });
          }}
        />
      </PageHeaderWrapper>
    );
  }
}

export default Page;
