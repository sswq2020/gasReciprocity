import React from 'react';
import dynamic from 'umi/dynamic';
import Redirect from 'umi/redirect';
// import services from '@/services';
import RenderAuthorized from '@/components/Authorized';
// import { getAuthority } from '@/utils/authority';

export default dynamic({
  async loader() {
    // 获取用户信息得到权限
    // const response = await services.queryCurrentUser();
    const Authorized = RenderAuthorized(['1']);
    return ({ children }) => {
      return (
        <Authorized
          authority={children.props.route.authority}
          noMatch={<Redirect to="/account/login" />}
        >
          {children}
        </Authorized>
      );
    };
    // const response = await services.queryCurrentUser();
    // if (response.code === 0) {
    //   for (let i = 0; i < response.result.auth.length; i++) {
    //     if (response.result.auth[i].authority === 'ROLE_admin') {
    //       return connect()(({ children }) => {
    //         return children;
    //       });
    //     }
    //   }
    //   window.localStorage.removeItem('xAuthToken');
    //   return () => <Redirect to="/account/login" />;
    // } else {
    //   window.localStorage.removeItem('xAuthToken');
    //   return () => <Redirect to="/account/login" />;
    // }
  },
});

// import React from 'react';
// import RenderAuthorized from '@/components/Authorized';
// import { getAuthority } from '@/utils/authority';
// import Redirect from 'umi/redirect';

// const Authority = getAuthority();
// const Authorized = RenderAuthorized(Authority);

// export default ({ children }) => (
//   <Authorized authority={children.props.route.authority} noMatch={<Redirect to="/account/login" />}>
//     {children}
//   </Authorized>
// );

// import React from 'react';
// import Redirect from 'umi/redirect';

// export default ({ children }) =>{
//   console.log(g_app);// 这里可以获取所有信息
//   return window.localStorage.getItem('xAuthToken') ? <Redirect to="/" /> : children;
// };
