import React from 'react';
import dynamic from 'umi/dynamic';
import Redirect from 'umi/redirect';
import services from '@/services';

export default dynamic({
  async loader() {
    const response = await services.queryCurrentUser();
    let hasAuth = false;
    switch (response.code) {
      case 0:
        for (let i = 0; i < response.result.auth.length; i++) {
          if (response.result.auth[i].authority === 'ROLE_admin') {
            hasAuth = true;
            // 保存用户信息
            g_app._store.dispatch({
              type: 'user/overrideStateProps',
              payload: {
                currentUser: response.result,
              },
            });
            break;
          }
        }
        if (hasAuth === false) {
          window.localStorage.removeItem('xAuthToken');
        }
        break;
      default:
        window.localStorage.removeItem('xAuthToken');
        break;
    }
    return ({ children }) => {
      // console.log(g_app._store.getState().user.currentUser);
      return hasAuth === true ? children : <Redirect to="/account/login" />;
    };
  },
});
