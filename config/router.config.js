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
  {
    path: '/',
    component: '../layouts/BasicLayout',
  },
  {
    path: '/gas',
    component: '../layouts/BasicLayout',
    // Routes: ['src/pages/Authorized'],
    // authority: ['admin', 'user'],
    routes: [
      { path: '/gas', redirect: '/gas/demo' },
      {
        path: '/gas/demo',
        name: 'demo',
        title: 'demo',
        icon: 'safety-certificate',
        // hideChildrenInMenu: true,
        routes: [
          { path: '/gas/demo', redirect: '/gas/demo/list' },
          {
            path: '/gas/demo/list',
            name: 'demoLit',
            title: 'demoLit',
            component: './Demo/List',
          },
        ],
      },
    ],
  },
];
