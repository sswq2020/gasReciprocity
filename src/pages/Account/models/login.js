import md5 from 'js-md5';
import { routerRedux } from 'dva/router';
import { message } from 'antd';
import { reducers } from '@/utils/utils';
import dict from '@/utils/dict';
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
        case dict.SUCCESS:
          if (response.data && response.data.userType) {
            window.localStorage.setItem('xAuthToken', response.data.token);
            yield put({
              type: 'user/overrideStateProps',
              payload: {
                currentUser: {
                  ...response.data,
                  auth: [response.data.userType],
                },
              },
            });
            window.location.href = window.location.origin + window.location.pathname;
          } else {
            message.warning('账号或密码错误！');
          }
          // yield put(
          //   routerRedux.push({
          //     pathname: '/',
          //   })
          // );
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
        case dict.SUCCESS:
          window.localStorage.removeItem('xAuthToken');
          window.localStorage.removeItem('authority');
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
