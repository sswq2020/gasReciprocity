import md5 from 'js-md5';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { reducers } from '@/utils/utils';
import { setAuthority } from '@/utils/authority';
import services from '@/services';

const namespace = 'login';
// const selectState = state => state[namespace];

export default {
  namespace,
  state: {},

  reducers,

  effects: {
    *login({ payload }, { call, put }) {
      const { loginName, password } = payload;

      const response = yield call(services.login, {
        loginName,
        userPasswd: md5(md5(password) + loginName),
      });
      switch (response.code) {
        case '000000':
          // todo 自动登陆
          // if (payload.autoLogin === true) {
          //   window.localStorage.setItem('xAuthToken', response.result['X-Auth-Token']);
          // }
          window.localStorage.setItem('xAuthToken', response.result.token);
          yield put({
            type: 'user/overrideStateProps',
            payload: {
              currentUser: {},
            },
          });
          setAuthority(['1']);
          yield put(
            routerRedux.push({
              pathname: '/',
            })
          );
          break;
        case 420:
          message.warning('账号或密码错误！');
          break;
        default:
          message.warning('登陆失败，请稍后重试！');
          break;
      }
    },
    *logout(_, { call, put }) {
      const response = yield call(services.logout);
      switch (response.code) {
        case '000000':
          window.localStorage.removeItem('xAuthToken');
          yield put({
            type: 'user/overrideStateProps',
            payload: {
              currentUser: {},
            },
          });
          yield put(
            routerRedux.push({
              pathname: '/account/login',
            })
          );

          break;
        default:
          message.warning('退出登录失败，请稍后重试！');
          break;
      }
    },
  },
};
