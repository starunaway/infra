export enum ApiErrorCode {
  SUCCESS = 200, // 成功
  Forbidden = 403,
  // 用户类状态码，11开头
  USER_EXIST = 10001, // 用户id无效
  // 权限相关，12 开头
  // scm 元信息 13 开头
  ScmNotFound = 13001,
  // scm 版本信息 14 开头
  // 数据库查询相关 15 开头
  // webhook 相关 16 开头
  WebhookError = 16001,
  // 查询 gitlab 17开头
  // 公共类型
  // 参数错误
  BadRequestException = 40001,
  // 重复的数据
  DuplicateException = 40002,
}

export const ErrorMsgMap: Partial<Record<ApiErrorCode, string>> = {};
