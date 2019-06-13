'use strict'

const MongodbController = require('./mongodbController');

class CollectController extends MongodbController {
  init() {
    this.daoService = this.service.collect;
  }

  // 添加收藏
  async addCollect(ctx) {
    var rule = {
      collecterId: 'string',
      articleId: 'string',
    }
    let result = this.app.validator.validate(rule, ctx.request.body);
    if (result) {
      ctx.body = {
        data: [],
        status: 400,
        message: "参数错误:" + result.map(item =>
          item.field + ": " + item.message
        )
      }
    } else {
      const collect = ctx.request.body;
      // const count = await this.service.article.count({ title: article.title });
      // if (count > 0) {
      //   this.fail('文章已存在', 417);
      //   return;
      // }
      await super.create(ctx);
    }
  }

  /**
   * 修改更新文章
   * @param {*} ctx
   * @memberof ArticleController
   */
  async updateArticle(ctx) {
    const count = await this.service.article.count({ _id: ctx.request.body.id });
    if (count) {
      await super.update(ctx);
    } else {
      super.fail({ status: 400, message: '文章不存在' });
    }
  }

  /**
   * 根据文章id查看详情
   * @param {id} ctx 
   */
  async getArticleDetial(ctx) {
    const count = await this.service.article.count({ _id: ctx.params.id });
    if (count) {
      await super.show(ctx);
    } else {
      ctx.body = {
        status: 400,
        data: '',
        message: '文章不存在',
      }
    }
  }

  /**
   * 删除文章
   * @param {id} ctx 
   */
  async deleteArticle(ctx) {
    const count = await this.service.article.count({ _id: ctx.params.id });
    if (count) {
      await super.destory(ctx);
    } else {
      ctx.body = {
        status: 400,
        data: '',
        message: '文章不存在',
      }
    }
  }

  async searchArticle(ctx) {
    const article = await this.service.article.show(ctx.query._id);
    ctx.body = article;
  }

  /**
   * 分页查询文章
   * @param {pageIndex,pageSize,type,value} ctx 
   */
  async getArticleList(ctx) {
    var rule = {
      pageIndex: 'int',
      pageSize: 'int',
      type: ["all", "title", "content"], // all 全部 ， title :标题 ,content:'文章内容'
      value: {
        type: 'string',
        required: false,
      }
    }
    let result = this.app.validator.validate(rule, ctx.request.body);
    if (result) {
      ctx.body = {
        data: [],
        status: 400,
        message: "参数错误:" + result.map(item =>
          item.field + ": " + item.message
        )
      }
    } else {
      const { type } = ctx.request.body;
      let result;
      // 获取全部文章
      if (type == 'all') {
        result = await this.service.article.index(ctx.request.body);
      } else if (type == 'title') {
        // 根据标题查询
        result = await this.service.article.index({ likes: { articleName: ctx.request.body.value, }, ...ctx.request.body });
      } else if (type == 'content') {
        // 根据内容查询
        result = await this.service.article.index({ likes: { articleContent: ctx.request.body.value, }, ...ctx.request.body });
      }
      if (result.count >= 0) {
        super.success({
          data: result,
          status: 200,
          message: '获取成功'
        })
      } else {
        super.fail({ status: 400, message: '获取失败' });
      }
    }
  }
}

module.exports = CollectController;