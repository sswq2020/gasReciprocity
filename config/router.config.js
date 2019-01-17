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
        // authority: ['admin'],
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
      {
        path: '/gasStationManage',
        name: 'gasStationManage',
        title: '加油站管理端',
        icon: 'safety-certificate',
        // authority: ['user'],
        routes: [
          { path: '/gasStationManage', redirect: '/gasStationManage/infoList' },
          {
            path: '/gasStationManage/infoList',
            name: 'gasInfoList',
            title: '加油明细',
            component: './GasStationManage/InfoList',
          },
          // {
          //   path: '/gasStationManage/priceApply',
          //   name: 'gasPriceApply',
          //   title: '调价申请',
          //   component: './GasStationManage/PriceApply',
          // },
          // {
          //   path: '/gasStationManage/billInfo',
          //   name: 'gasBillInfo',
          //   title: '开票信息',
          //   component: './GasStationManage/BillInfo',
          // },
          // {
          //   path: '/gasStationManage/billCheck',
          //   name: 'gasBillCheck',
          //   title: '票据对账',
          //   component: './GasStationManage/BillCheck',
          // },
        ],
      },
    ],
  },
];
