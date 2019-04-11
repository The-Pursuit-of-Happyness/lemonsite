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

export async function getInfo() {
  return request('/api/user/about', {
    method: 'GET',
  })
}

//获取文章列表
export  async function getArticleList(params) {
  return request('/api/article/articleList',{
    method: 'POST',
    body:{
      ...params,
    }
  })
}

//获取标签列表
export  async function getTagList() {
  return request('/api/tags',{
    method: 'GET',
  })
}
