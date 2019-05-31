'use strict';

const DaoService = require('./daoService');

class ArticleService extends DaoService {
  init() {
    this.model = this.ctx.model.Article;
  }

  async create(article) {
    const id = super.create(article);
    let data = {};
    if (id) {
      data = {
        status: 200,
        data: '',
        message: '文章添加成功',
      }
    } else {
      data = {
        status: 400,
        data: '',
        message: '文章添加失败,请稍后重试',
      }
    }
    return data;
  }

  // 计算数量
  async count(query) {
    return await super.count(query);
  }

  // 查询
  async index(query) {
    return await super.index(query);
  }
}
module.exports = ArticleService;