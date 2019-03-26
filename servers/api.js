import { stringify } from 'qs';
import request from '../utils/request';

/**
 * 登录接口
 * @param {*} params 
 */
export async function login(params) {
  return request('/api/user/login', {
    method: 'POST',
    body: {
      ...params,
    }
  })
}