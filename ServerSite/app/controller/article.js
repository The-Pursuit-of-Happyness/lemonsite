'use strict';
const Controller = require('egg').Controller;

class ArticleController extends Controller {
    async getList() {
        const { type, key } = this.ctx.request.body;
        let param = null;
        if(type === 'title' && key ){
            param = { tag: key };
        } else if( type === 'article' && key ){
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
