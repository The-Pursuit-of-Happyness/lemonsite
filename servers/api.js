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

//增加文章
export async function addArticle(params) {
    return request('/api/article/addarticle', {
        method: 'POST',
        body: {
            ...params,
        }
    })
}

// 删除文章
export async function deleteArticle(params) {
    return request('/api/article/deletearticle', {
        method: 'GET',
        params: {
            ...params
        }
    })
}

//获取文章列表
export async function getArticleList(params) {
    return request('/api/article/articleList', {
        method: 'POST',
        body: {
            ...params,
        }
    })
}

//获取标签列表
export async function getTagList() {
    return request('/api/tags', {
        method: 'GET',
    })
}

//获取文章详情
export async function getArticleDetail(id) {
    console.log('id:', id);
    return request(`/api/article/${id.id}`, {
        method: 'GET',
    })
}

export async function importExcel(params) {
    console.log(params)
    return request('/api/article/importExcel', {
        method: 'POST',
        body: params,
    })
}