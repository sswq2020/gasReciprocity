import React from 'react';
import dynamic from 'umi/dynamic';
import Redirect from 'umi/redirect';
import services from '@/services';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

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
      const Authorized = RenderAuthorized(getAuthority());

      return hasAuth === true ? (
        <Authorized
          authority={children.props.route.authority}
          noMatch={<Redirect to="/account/login" />}
        >
          {children}
        </Authorized>
      ) : (
        <Redirect to="/account/login" />
      );
    };
  },
});
