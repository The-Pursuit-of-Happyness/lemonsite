'use strict'

const MongodbController = require('./mongodbController');

class UserController extends MongodbController {
  init() {
    this.daoService = this.service.user;
  }

  /**
   * 用户注册
   * @param {*} ctx 
   */
  async register(ctx) {
    const registerinfo = ctx.request.body;
    const count = await this.service.user.count({ username: registerinfo.username });
    if (count > 0) {
      this.fail('用户名已经被注册', 417);
      return;
    }
    await super.create(ctx);
  }

  async deleteUser(ctx) {
    const count = await this.service.user.count({ _id: ctx.query._id });
    if (count) {
      await super.destory(ctx);
    } else {
      ctx.body = {
        status: 400,
        data: '',
        message: '用户不存在',
      }
    }
  }

  async searchArticle(ctx) {
    const userinfo = await this.service.user.show(ctx.query._id);
    ctx.body = userinfo;
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

  async getDetail() {
    this.ctx.body = {
      Data: {
        articleDetails: {
          artiidId: '0001',
          tag: '正则',
          articleName: '常用正则整理',
          imageUrl: 'https://t1.hddhhn.com/uploads/tu/201612/98/st94.png',
          date: '2018-10-23',
          readCount: 23,
          commentCount: 34,
          likeCount: 324,
          keepCount: 34,
          updateDate: new Date(),
          author: 'guoguo'
        },
      },
      ResultType: 0,
      Message: '请求成功',
    };
  }
}

module.exports = UserController;