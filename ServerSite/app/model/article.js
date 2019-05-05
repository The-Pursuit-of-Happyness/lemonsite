'use strict'

// 存储文章信息
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const articleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: String,
    tag: { //文章标签
      type: String,
    },
    articleName: { //文章名称
      type: String,
    },
    articleType: String,
    articleContent: String,
    source: String,
    createtime: String,
    lastModification: { //更新日期
      type: Date,
    },
    pageView: Number, //阅读量
    comment: Object, //评论数
    likeNum: { //点赞数量
      type: Number,
    },
    linkicon: String,
    artiidId: {
      type: String,
    },
    imageUrl: { //图片地址
      type: String,
    },
    commentCount: { //评论数
      type: Number,
    },
  }, {
    versionKey: false,
  });
  return mongoose.model('articles', articleSchema);
}