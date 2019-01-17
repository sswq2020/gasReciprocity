export default [
  // user
  {
    path: '/account',
    // component: '../layouts/UserLayout',
    Routes: ['src/pages/AccountAuthorized'],
    routes: [
      { path: '/account', redirect: '/account/login' },
      { path: '/account/login', component: './Account/Login' },
    ],
  },
  // app
  {
    path: '/',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      // { path: '/', redirect: '/machine' },
      {
        path: '/gasSys',
        name: 'gasSys',
        title: '加油站管理',
        icon: 'safety-certificate',
        // hideChildrenInMenu: true,
        routes: [
          { path: '/gasSys', redirect: '/gasSys/gas' },
          {
            path: '/gasSys/gas',
            name: 'gasSysGas',
            title: '油站管理',
            component: './GasSys/GasList',
          },
          {
            path: '/gasSys/gas/create',
            name: 'gasSysGasCreate',
            title: '新建',
            component: './GasSys/GasCreate',
            hideInMenu: true,
          },
          {
            path: '/gasSys/gas/edit/:id',
            name: 'gasSysGasEdit',
            title: '编辑',
            component: './GasSys/GasEdit',
            hideInMenu: true,
          },
        ],
      },
    ],
  },
];
