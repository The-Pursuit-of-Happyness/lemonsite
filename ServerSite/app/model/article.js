'use strict';

module.exports = app => {
    const mongoose = app.mongoose;
    const Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        artiidId: {
            type: String,
        },
        tag: { //文章标签
            type: String,
        },
        articleName:{ //文章名称
            type: String,
        },
        imageUrl: { //图片地址
            type: String,
        },
        date:{ //日期
            type: Date,
        },
        readCount: {//阅读量
            type: String,
        },
        commentCount:{//评论数
            type: Number,
        },
        likeCount: {//点赞数量
            type: String,
        },
        keepCount:{ //收藏数量
            type: String,
        }
    });
    return mongoose.model('Article', ArticleSchema);
};
