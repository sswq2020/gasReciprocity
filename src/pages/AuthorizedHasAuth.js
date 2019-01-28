import React from 'react';
import dynamic from 'umi/dynamic';
import Redirect from 'umi/redirect';
import services from '@/services';
import dict from '@/utils/dict';
import { setAuthority } from '@/utils/authority';

export default dynamic({
  async loader() {
    // console.log('loader');
    const response = await services.queryCurrentUser();
    switch (response.code) {
      case dict.SUCCESS:
        if (response.data && response.data.userType) {
          // 保存用户信息
          g_app._store.dispatch({
            type: 'user/overrideStateProps',
            payload: {
              currentUser: {
                ...response.data,
                auth: [response.data.userType],
              },
            },
          });
        }

        break;
      default:
        window.localStorage.removeItem('xAuthToken');
        window.localStorage.removeItem('authority');
        break;
    }
    return ({ children }) => {
      // console.log('render');
      const user = g_app._store.getState().user.currentUser;
      // console.log(user, children);
      if (user === null) {
        window.localStorage.removeItem('xAuthToken');
        window.localStorage.removeItem('authority');
        return <Redirect to="/account/login" />;
      } else {
        setAuthority(user.auth);
        if (children.props.location.pathname === '/') {
          switch (user.auth[0]) {
            case '1':
              return <Redirect to="/gasSys" />;
            case '2':
              return <Redirect to="/gasStationManage" />;
            default:
              break;
          }
        }
        return children;
      }
    };
  },
});
