'use strict'

const MongodbController = require('./mongodbController');

class ArticleController extends MongodbController {
  init() {
    this.daoService = this.service.article;
  }

  async addArticle(ctx) {
    const article = ctx.request.body;
    // const count = await this.service.article.count({ title: article.title });
    // if (count > 0) {
    //   this.fail('文章已存在', 417);
    //   return;
    // }
    await super.create(ctx);
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

  async getList() {
    const { type, key } = this.ctx.request.body;
    let param = null;
    if (type === 'title' && key) {
      param = { tag: key };
    } else if (type === 'article' && key) {
      param = { articleName: /^\`${key}`\// };
    }
    const articleList = await this.ctx.model.Article.find(param);
    this.ctx.body = {
      Data: {
        articleList,
        // articleList:[{
        //     artiidId:'0001',
        //     tag:'正则',
        //     articleName: '常用正则整理',
        //     imageUrl:'https://t1.hddhhn.com/uploads/tu/201612/98/st94.png',
        //     date:'2018-10-23',
        //     readCount:23,
        //     commentCount:34,
        //     likeCount:324,
        //     keepCount:34,
        // },{
        //     artiidId:'0041',
        //     tag:'js',
        //     articleName: '前端有趣技巧网站',
        //     imageUrl:'https://t1.hddhhn.com/uploads/tu/201612/98/st94.png',
        //     date:'2018-12-12',
        //     readCount:23,
        //     commentCount:34,
        //     likeCount:324,
        //     keepCount:34,
        // }],
      },
      ResultType: 0,
      Message: '请求成功',
    };
  }
}

module.exports = ArticleController;