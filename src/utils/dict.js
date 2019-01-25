const dict = {};
// 成功
dict.SUCCESS = 0;

// 没有权限
dict.PERMISSION_INVALID = 200;

// 未登录
dict.LOGIN_REQUIRED = 210;

// 数据不正确
dict.DATA_INVALID = 300;

// 不被识别的数据类型
dict.DATA_UNRECOGNIZED = 310;

// 数据格式不正确
dict.DATA_FORMAT_INVALID = 311;

// 表单数据不正确
dict.DATA_FORM_INVALID = 320;

// 电话号码已存在
dict.DATA_PHONE_EXIST = 331;

// 数据不存在
dict.DATA_NOT_EXIST = 340;

// 电话号码不存在
dict.DATA_PHONE_NOT_EXIST = 341;

// 参数错误
dict.DATA_FIELD_INVALID = 350;

// 验证码不正确
dict.DATA_VERIFY_CODE_INVALID = 351;

// 获取用户信息失败
dict.AUTH_FAILED = 400;

// 用户身份异常
dict.AUTH_IDENTITY_ABNORMAL = 410;

// 用户未激活
dict.AUTH_IDENTITY_NOT_ACTIVE = 411;

// 登录失败
dict.LOGIN_FAILED = 420;

// 客户端类型错误
dict.CLIENT_INVALID = 500;

// 操作失败
dict.OPERATE_FAILED = 600;

// 操作次数已达上限
dict.REACH_THE_MAX = 610;

// 资源无效
dict.RESOURCE_INVALID = 700;

// 资源不存在
dict.RESOURCE_NOT_EXIST = 710;

// 资源已存在
dict.RESOURCE_EXIST = 720;

// 资源未改变
dict.RESOURCE_NOT_MODIFIED = 730;

// 资源已改变
dict.RESOURCE_MODIFIED = 740;

dict.errorCode = {
  [dict.SUCCESS]: '成功',
  [dict.PERMISSION_INVALID]: '没有权限',
  [dict.LOGIN_REQUIRED]: '未登录',
  [dict.DATA_INVALID]: '数据不正确',
  [dict.DATA_UNRECOGNIZED]: '不被识别的数据类型',
  [dict.DATA_FORMAT_INVALID]: '数据格式不正确',
  [dict.DATA_FORM_INVALID]: '表单数据不正确',
  [dict.DATA_PHONE_EXIST]: '电话号码已存在',
  [dict.DATA_NOT_EXIST]: '数据不存在',
  [dict.DATA_PHONE_NOT_EXIST]: '电话号码不存在',
  [dict.DATA_FIELD_INVALID]: '参数错误',
  [dict.DATA_VERIFY_CODE_INVALID]: '验证码不正确',
  [dict.AUTH_FAILED]: '获取用户信息失败',
  [dict.AUTH_IDENTITY_ABNORMAL]: '用户身份异常',
  [dict.AUTH_IDENTITY_NOT_ACTIVE]: '用户未激活',
  [dict.LOGIN_FAILED]: '登录失败',
  [dict.CLIENT_INVALID]: '客户端类型错误',
  [dict.OPERATE_FAILED]: '操作失败',
  [dict.REACH_THE_MAX]: '操作次数已达上限',
  [dict.RESOURCE_INVALID]: '资源无效',
  [dict.RESOURCE_NOT_EXIST]: '资源不存在',
  [dict.RESOURCE_EXIST]: '资源已存在',
  [dict.RESOURCE_NOT_MODIFIED]: '资源未改变',
  [dict.RESOURCE_MODIFIED]: '资源已改变',
};

dict.oilModelIsDefault = 1;
dict.oilModelIsNotDefault = 0;
dict.oilModelDefault = {
  [dict.oilModelIsDefault]: '是',
  [dict.oilModelIsNotDefault]: '否',
};

dict.oilModelIsDeleted = 1;
dict.oilModelIsNotDeleted = 0;
dict.oilModelDeleted = {
  [dict.oilModelIsDeleted]: '禁用',
  [dict.oilModelIsNotDeleted]: '启用',
};

dict.gasIsBan = '1';
dict.gasIsNotBan = '0';
dict.gasIsBaned = {
  [dict.gasIsBan]: '禁用',
  [dict.gasIsNotBan]: '启用',
};

export default dict;
