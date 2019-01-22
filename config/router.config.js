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
    // Routes: ['src/pages/AuthorizedHasToken', 'src/pages/AuthorizedHasAuth'],
    authority: ['1', '2'],
    routes: [
      // { path: '/', redirect: '/machine' },
      {
        path: '/gasSys',
        name: 'gasSys',
        title: '加油站管理',
        icon: 'shop',
        // authority: ['1'],
        // hideChildrenInMenu: true,
        routes: [
          { path: '/gasSys', redirect: '/gasSys/gas' },
          {
            path: '/gasSys/gas',
            name: 'gasSysGas',
            title: '加油站',
            component: './GasSys/GasList',
          },
          {
            path: '/gasSys/gas/create',
            name: 'gasSysGasCreate',
            title: '新建加油站',
            component: './GasSys/GasCreate',
            hideInMenu: true,
          },
          {
            path: '/gasSys/gas/edit/:id',
            name: 'gasSysGasEdit',
            title: '编辑加油站',
            component: './GasSys/GasEdit',
            hideInMenu: true,
          },
          {
            path: '/gasSys/service',
            name: 'gasSysService',
            title: '特色服务',
            component: './GasSys/ServiceList',
          },
          {
            path: '/gasSys/oil',
            name: 'gasSysOil',
            title: '油品分类',
            component: './GasSys/OilList',
          },
        ],
      },
      {
        path: '/gasStationManage',
        name: 'gasStationManage',
        title: '加油站管理端',
        icon: 'dashboard',
        authority: ['2'],
        routes: [
          { path: '/gasStationManage', redirect: '/gasStationManage/infoList' },
          {
            path: '/gasStationManage/infoList',
            name: 'gasInfoList',
            title: '加油明细',
            component: './GasStationManage/InfoList',
          },
          {
            path: '/gasStationManage/priceApply',
            name: 'gasPriceApply',
            title: '调价申请',
            component: './GasStationManage/PriceApply',
          },
          {
            path: '/gasStationManage/billInfo',
            name: 'gasBillInfo',
            title: '开票信息',
            component: './GasStationManage/BillInfo',
          },
          {
            path: '/gasStationManage/billCheck',
            name: 'gasBillCheck',
            title: '票据对账',
            component: './GasStationManage/BillCheck',
          },
        ],
      },
      {
        path: '/financeSys',
        name: 'financeSys',
        title: '票务管理',
        icon: 'money-collect',
        // authority: ['2'],
        routes: [
          { path: '/financeSys', redirect: '/financeSys/gasDetail' },
          {
            path: '/financeSys/gasDetail',
            name: 'gasDetail',
            title: '加油明细',
            component: './financeSys/GasDetail',
          },
          {
            path: '/financeSys/invoiceConfirm',
            name: 'invoiceConfirm',
            title: '收票确认',
            component: './financeSys/InvoiceConfirm',
          },
          {
            path: '/financeSys/invoiceConfirm/create',
            name: 'createInvoice',
            title: '新增发票',
            component: './financeSys/CreateInvoice',
            hideInMenu: true,
          },
        ],
      },
    ],
  },
];
