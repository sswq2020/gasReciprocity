import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GasForm from './components/GasForm';

@connect(({ loading, gasCreate }) => ({
  gasCreate,
  isLoading: loading.effects['gasCreate/submit'],
}))
class Page extends PureComponent {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({ type: 'gasCreate/resetFormData' });
  }
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
              type: 'gasCreate/submit',
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
