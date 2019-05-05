'use strict'

const MongodbController = require('./mongodbController');

class ArticleController extends MongodbController {
  init() {
    this.daoService = this.service.article;
  }

  async addArticle(ctx) {
    const article = ctx.request.body;
    const count = await this.service.article.count({ title: article.title });
    if (count > 0) {
      this.fail('文章已存在', 417);
      return;
    }
    await super.create(ctx);
  }

  async deleteArticle(ctx) {
    await super.destorey(ctx);
  }

  async searchArticle(ctx) {
    const article = await this.service.article.show(ctx.query._id);
    ctx.body = article;
  }
}

module.exports = ArticleController;