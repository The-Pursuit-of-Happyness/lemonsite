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

  async show(name) {
    const queries = {
      name
    };

    const detail = await this.model.findOne(queries);
    const data = {
      status: 200,
      data: detail
    }
    return data;
  }
}

module.exports = ArticleService;