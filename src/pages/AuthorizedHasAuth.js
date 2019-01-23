import React from 'react';
import dynamic from 'umi/dynamic';
import Redirect from 'umi/redirect';
import services from '@/services';
import RenderAuthorized from '@/components/Authorized';
import { getAuthority } from '@/utils/authority';

let hasAuth = false;

export default dynamic({
  async loader() {
    let {
      user: { currentUser },
    } = g_app._store.getState();
    hasAuth = !!currentUser;

    if (hasAuth === false) {
      const response = await services.queryCurrentUser();
      switch (response.code) {
        case 0:
          hasAuth = !!response.data.userType;
          if (hasAuth) {
            hasAuth = true;
            // 保存用户信息
            currentUser = {
              ...response.data,
              auth: [response.data.userType],
            };
            g_app._store.dispatch({
              type: 'user/overrideStateProps',
              payload: {
                currentUser,
              },
            });
          } else {
            window.localStorage.removeItem('xAuthToken');
          }
          break;
        default:
          window.localStorage.removeItem('xAuthToken');
          break;
      }
    }
    return ({ children }) => {
      if (hasAuth === false) {
        const {
          user: { currentUser: curtUser },
        } = g_app._store.getState();
        hasAuth = !!curtUser;
      }
      if (hasAuth === true) {
        const Authorized = RenderAuthorized(getAuthority(curtUser.auth));
        return (
          <Authorized
            authority={children.props.route.authority}
            noMatch={<Redirect to="/account/login" />}
          >
            {children}
          </Authorized>
        );
      } else {
        return <Redirect to="/account/login" />;
      }
    };
  },
});
