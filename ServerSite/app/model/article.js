'use strict'

// 存储文章信息
module.exports = app => {
  const mongoose = app.mongoose;
  const Mixed = mongoose.Schema.Types.Mixed;
  const articleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorId: String,
    tags: Object,
    title: String,
    articleType: String,
    articleContent: String,
    source: String,
    createtime: String,
    lastModification: String,
    pageView: Number,
    comment: Object,
    likeNum: Number,
    linkicon: String,
  }, {
    versionKey: false,
  });
  return mongoose.model('articles', articleSchema);
}