import React from 'react';
import Redirect from 'umi/redirect';

export default ({ children }) => {
  return window.localStorage.getItem('xAuthToken') ? children : <Redirect to="/account/login" />;
};
