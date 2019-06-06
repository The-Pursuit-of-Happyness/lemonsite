'use strict'

const MongodbController = require('./mongodbController');

class CommentController extends MongodbController {
  init() {
    this.daoService = this.service.comment;
  }

  // 添加评论
  async addCommit(ctx) {
    var rule = {
      owner_user_id: 'string',
      articleId: 'string',
      parent_id: { type: 'string', required: false },
      commentType: 'string',
      content: 'string',
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
      let addresult = await this.service.comment.create(ctx.request.body);
      if (addresult) {
        super.success({
          data: addresult,
          status: 200,
          message: '评价成功'
        })
      } else {
        super.fail({ status: 400, message: '评价失败' });
      }
    }
  }

  // 回复评论
  async replyCommit(ctx) {
    var rule = {
      owner_user_id: 'string',
      target_user_id: 'string',
      articleId: 'string',
      parent_id: { type: 'string', required: false },
      commentType: 'string',
      content: 'string',
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
      let addresult = await this.service.comment.create(ctx.request.body);
      if (addresult) {
        super.success({
          data: addresult,
          status: 200,
          message: '回复成功'
        })
      } else {
        super.fail({ status: 400, message: '回复失败' });
      }
    }
  }

  /**
   * 修改更新评论
   * @param {*} ctx
   * @memberof ArticleController
   */
  async updateArticle(ctx) {
    const count = await super.count({ _id: ctx.request.body.id });
    if (count) {
      await super.update(ctx);
    } else {
      super.fail({ status: 400, message: '评价不存在' });
    }
  }

  /**
   * 删除评论
   * @param {id} ctx 
   */
  async deleteComment(ctx) {
    console.log("zz");
    const count = await super.count({ _id: ctx.params.id });
    if (count) {
      await super.destory(ctx);
    } else {
      ctx.body = {
        status: 400,
        data: '',
        message: '评论不存在',
      }
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

module.exports = CommentController;