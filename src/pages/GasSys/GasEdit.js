import React, { PureComponent } from 'react';
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import GasForm from './components/GasForm';

@connect(({ loading, gasEdit }) => ({
  gasEdit,
  isLoading: loading.effects['gasEdit/submit'],
  isGetDetailing: loading.effects['gasEdit/detail'],
}))
class Page extends PureComponent {
  componentDidMount() {
    const {
      dispatch,
      match: {
        params: { id },
      },
    } = this.props;
    dispatch({ type: 'gasEdit/detail', payload: id });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({ type: 'gasEdit/resetFormData' });
  }

  render() {
    const {
      dispatch,
      isLoading,
      isGetDetailing,
      gasEdit: { formData },
    } = this.props;
    return (
      <PageHeaderWrapper>
        <GasForm
          loading={isLoading}
          data={formData}
          hasData={!isGetDetailing}
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
