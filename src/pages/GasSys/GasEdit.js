import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GasForm from './components/GasForm';

@connect(({ loading, gasEdit }) => ({
  gasEdit,
  isLoading: loading.effects['gasEdit/submit'],
}))
class Page extends PureComponent {
  render() {
    const {
      dispatch,
      gasEdit: { formData },
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
              type: 'gasEdit/submit',
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
