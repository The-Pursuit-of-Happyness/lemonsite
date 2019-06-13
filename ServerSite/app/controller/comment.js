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
   * 分页查询子评论
   * @param {pageIndex,pageSize,parentCommentId} ctx 
   */
  async getSubCommentList(ctx) {
    var rule = {
      pageIndex: 'int',
      pageSize: 'int',
      parentCommentId: 'string'
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
      let result = await this.service.comment.index({ eqs: { parent_id: ctx.request.body.parentCommentId, }, ...ctx.request.body, sorts: { created: 'asc' } });
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

  /**
   * 根据文章id分页查看评论
   * @param {pageIndex,pageSize,articleId} ctx 
   */
  async getCommentList(ctx) {
    var rule = {
      pageIndex: 'int',
      pageSize: 'int',
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
      let result = await this.service.comment.index({ eqs: { articleId: ctx.request.body.articleId, commentType: 'addcomment' }, ...ctx.request.body, sorts: { created: 'asc' } });
      if (result.count >= 0) {
        let thiz = this;
        let tempresult = [];
        await Promise.all(result.items.map(async item => {
          let query = {
            pageIndex: 1,
            pageSize: 5,
            parentCommentId: item._id
          }
          let subcommentlist = await thiz.service.comment.index({ eqs: { parent_id: item._id, }, ...query, sorts: { created: 'asc' } });
          tempresult.push({
            _id: item._id,
            owner_user_id: item.owner_user_id,
            target_user_id: item.target_user_id,
            likeCount: item.likeCount,
            articleId: item.articleId,
            commentType: item.commentType,
            content: item.content,
            created: item.created,
            subcommentlist: subcommentlist.items,
          });
        }))
        super.success({
          data: tempresult,
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